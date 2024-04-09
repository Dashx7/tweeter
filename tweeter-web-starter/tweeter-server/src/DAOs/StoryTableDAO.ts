import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";
import { DynamoDBClient, QueryCommand, ReturnValue } from "@aws-sdk/client-dynamodb";
import { QueryCommandInput, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { UserTableDAO } from "./UserTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";

//Story table will have the key alias, and associate those with their statuses sorted by timestame

export class StoryTableDAO implements StoryTableInterface {
    private client = new DynamoDBClient({ region: "us-east-1" });
    private readonly storyTableName = "stories";
    private readonly authTokenTableName = "authtokens";
    private userTableDao: UserTableDAO = new UserTableDAO();

    // TODO: Finish implementing and test
    async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        console.log("Auth token " + authToken.token);
        AuthTokenTableDAO.authenticate(authToken);
        const alias = user.alias;
        console.log("Alias in query " + alias);

        const params: QueryCommandInput = {
            TableName: "stories",
            KeyConditionExpression: "#alias = :alias",
            ExpressionAttributeNames: {
                "#alias": "alias"
            },
            ExpressionAttributeValues: {
                ":alias": alias
            }
        };

        const responseToQuery = await this.client.send(new QueryCommand(params));
        console.log("Finished response");

        if (responseToQuery.Items == null) {
            console.log("No statuses found");
            return [[], false]; // User has no statuses
        }
        if (responseToQuery.Items && responseToQuery.Items.length > 0) {
            // It's safe to access responseToQuery.Items[0]
            console.log(responseToQuery.Items[0]);
        }
        return [[], false]; //Temp
    }

    // TODO: Test
    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        AuthTokenTableDAO.authenticate(authToken);
        const alias = status.user.alias; //Pulling the alias from the status's user
        console.log(status.segments);
        const formattedSegments = status.segments.map(segment => ({ // This is to format the segments to be put into the database
            text: segment.text,
            startPostion: segment.startPostion,
            endPosition: segment.endPosition,
            type: segment.type
        }));
        if (formattedSegments === null) {
            throw new Error("Error formatting segments");
        }
        console.log(formattedSegments);

        const updateParams = {
            TableName: this.storyTableName,
            Key: {
                alias: alias.toString(),
                time_stamp: status.timestamp.toString()
            },
            UpdateExpression: 'SET status_segments = list_append(if_not_exists(status_segments, :empty_list), :newSegment)',
            ExpressionAttributeValues: {
                ':newSegment': [formattedSegments],
                ':empty_list': []
            },
            ReturnValues: ReturnValue.UPDATED_NEW
        };

        const responseToUpdate = await this.client.send(new UpdateCommand(updateParams));
        if (responseToUpdate == null) {
            throw new Error("Error posting status");
        }
        console.log(responseToUpdate);

        return;
    }
}