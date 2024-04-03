import { AuthToken, User, Status } from "tweeter-shared";
import { StoryTableInterface } from "./AbstractStoryTableDAO";

//Story table will have the key alias, and associate those with their statuses sorted by timestame

export class StoryTableDAO implements StoryTableInterface {
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
        throw new Error("Method not implemented.");
        // Use your Authtoken's alias to put a new story onto the list sorted by its timestamp
    }
}