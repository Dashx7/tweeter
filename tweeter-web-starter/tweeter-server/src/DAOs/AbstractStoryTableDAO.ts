import { AuthToken, User, Status } from "tweeter-shared";

export interface StoryTableInterface {
    loadMoreStoryItems(
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