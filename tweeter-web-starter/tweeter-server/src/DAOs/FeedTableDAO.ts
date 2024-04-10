import { AuthToken, User, Status } from "tweeter-shared";
import { FeedTableInterface } from "./AbstractFeedTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";

//Feed table will have the key alias, and associate those with status of their friends sorted by timestamp (post, user, timestamp, segment)

export class FeedTableDAO implements FeedTableInterface {
    private feedTableName: string = "feeds";
    async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {

        return [[], false];
    }

    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {

        return;
        // First query request of all followers of alias
        // For each follower Put request their alias and then the status

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
    }
}