import { AuthToken, User, Status } from "tweeter-shared";

export interface StoryTableInterface {
    loadMoreStoryItems(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>;

    postStatus(
        status: Status
    ): Promise<void>;
}