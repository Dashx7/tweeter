import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

//Story table will have the key alias, and associate those with their statuses sorted by timestame

export class StoryTableDAO implements StoryTableInterface {
    private client = new DynamoDBClient({ region: "us-east-1" });
    private readonly storyTableName = "stories";
    private readonly authTokenTableName = "authtokens";

    async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
        // Query the feed
    }

    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        // TODO: Implement this method
        // Use your Authtoken's alias to put a new story onto the list sorted by its timestamp
        // const getParams = {
        //     TableName: this.authTokenTableName,
        //     Key: {
        //         token: authToken.token
        //     }
        // };
        // const responseToGet = await this.client.send(new GetCommand(getParams));
        // if (responseToGet.Item == null) {
        //     throw new Error("Invalid token");
        // }
        // console.log(responseToGet.Item);

        // if (!responseToGet.Item.alias) {
        //     throw new Error(`Token ${authToken.token} is missing alias field`);
        // }

        // const aliasToUse = responseToGet.Item.alias;
        const currentTime = new Date().toISOString();

        const alias = status.user;
        const putParams = {
            TableName: this.storyTableName,
            Item: {
                sender_alias: alias,
                time_stamp: currentTime,
                //TODO put in the status
            }
        };
        const responseToStatusPut = await this.client.send(new PutCommand(putParams));


    }
}