import { AuthToken, User, Status } from "tweeter-shared";
import { FeedTableInterface } from "./AbstractFeedTableDAO";

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
    }
}