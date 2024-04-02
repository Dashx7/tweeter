import { AuthToken, User, Status } from "tweeter-shared";
import { FeedTableInterface } from "./AbstractFeedTableDAO";

export class FeedTableDAO implements FeedTableInterface {
    async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // Replace with actual implementation
        return [[], false];
    }

    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        // Replace with actual implementation
        return;
    }
}