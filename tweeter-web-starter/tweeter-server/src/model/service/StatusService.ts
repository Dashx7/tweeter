import { AuthToken, User, Status, FakeData } from "tweeter-shared";
import { BaseService } from "./BaseService";

export class StatusService extends BaseService {
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
        console.log("Loading more story items");
        console.log("User: " + user.toJson());
        console.log("PageSize: " + pageSize);
        console.log("LastItem: " + lastItem);

        return this.getStoryDAO().loadMoreStoryItems(authToken, user, pageSize, lastItem);
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        await this.getStoryDAO().postStatus(authToken, newStatus);
        // await this.feedService.postStatus(authToken, newStatus); // This will be changed in 4b

        return;
    };
}
