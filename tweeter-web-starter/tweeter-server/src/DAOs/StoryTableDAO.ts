import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";

export class StoryTableDAO implements StoryTableInterface {
    async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }
}