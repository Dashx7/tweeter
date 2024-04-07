import { AuthToken, User, Status, FakeData } from "tweeter-shared";
import { BaseService } from "./BaseService";

export class StatusService {
    private storyService = new BaseService().getStoryDAO();
    private feedService = new BaseService().getFeedDAO();

    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        await this.storyService.postStatus(authToken, newStatus);
        // await this.feedService.postStatus(authToken, newStatus);

        return;
    };
}
