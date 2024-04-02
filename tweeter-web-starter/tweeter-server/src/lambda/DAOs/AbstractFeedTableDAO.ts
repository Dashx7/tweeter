import { AuthToken, User, Status } from "tweeter-shared";
export interface FeedTableInterface {
    loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>;

    postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void>;
}
