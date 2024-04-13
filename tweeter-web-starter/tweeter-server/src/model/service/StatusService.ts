import { AuthToken, User, Status, FakeData } from "tweeter-shared";
import { BaseService } from "./BaseService";
import { AuthTokenTableDAO } from "../../DAOs/AuthTokenTableDAO";

export class StatusService extends BaseService {
    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        console.log("Loading more story items");
        console.log("User: " + user.toJson());
        console.log("PageSize: " + pageSize);
        console.log("LastItem: " + lastItem);

        const response = await this.getStoryDAO().loadMoreStoryItems(authToken, user, pageSize, lastItem);
        console.log("Got back response in status service :" + response.toString());
        return response;
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        AuthTokenTableDAO.authenticate(authToken);

        await this.getStoryDAO().postStatus(authToken, newStatus);
        // await this.feedService.postStatus(authToken, newStatus); // This will be changed in 4b

        return;
    };
}
