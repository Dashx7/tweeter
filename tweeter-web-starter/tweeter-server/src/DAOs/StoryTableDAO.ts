import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { UserTableDAO } from "./UserTableDAO";

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
        const getParams = {
            TableName: this.storyTableName,
            Key: {
                sender_alias: user.alias
            }
        };
        const responseToQuery = await this.client.send(new QueryCommand(getParams));
        console.log(responseToQuery);

        if (responseToQuery.Items == null) {
            return [[], false]; // User has no statuses
        }

        // Get the user associated with the statuses


        // let statuses: Status[] = responseToQuery.Items.map((item: any) => {
        //     let user = new User(
        //         item.sender_alias.S,
        //         item.first_name.S,
        //         item.last_name.S,
        //         item.image_URL.S,
        //     );

        //     let segments = item.segments.L.map((segmentItem: any) => {
        //         return new PostSegment(
        //             segmentItem.segment_type.S,
        //             segmentItem.content.S
        //             // add more parameters if PostSegment constructor requires
        //         );
        //     });

        //     return new Status(
        //         item.post.S,
        //         user,
        //         Number(item.time_stamp.N)
        //     );
        // });

        // return new Status(
        //     item.post.S,
        //     user,
        //     Number(item.time_stamp.N),
        //     segments
        // );

        return [[], false]; //Temp
    }

    // TODO: Test
    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {

        const alias = status.user.alias; //Pulling the alias from the status's user
        const formattedSegments = status.segments.map(segment => ({ // This is to format the segments to be put into the database
            text: segment.text,
            startPostion: segment.startPostion,
            endPosition: segment.endPosition,
            type: segment.type
        }));
        console.log(formattedSegments);
        const putParams = {
            TableName: this.storyTableName,
            Item: {
                alias: alias,
                time_stamp: status.timestamp,
                post: status.post,
                segments: formattedSegments,
            }
        };
        const responseToStatusPut = await this.client.send(new PutCommand(putParams));
        if (responseToStatusPut == null) {
            throw new Error("Error posting status");
        }
        console.log(responseToStatusPut);

        return;
    }
}