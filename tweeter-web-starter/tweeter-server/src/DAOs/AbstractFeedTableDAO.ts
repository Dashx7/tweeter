import { AuthToken, User, Status } from "tweeter-shared";

export interface FeedTableInterface {
    loadMoreFeedItems(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>;

    postStatus(
        status: Status,
        followerAlias: string
    ): Promise<void>;
}
