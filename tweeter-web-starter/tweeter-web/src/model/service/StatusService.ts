import { AuthToken, User, Status, FakeData, LoadMoreStatusItemsRequest, PostStatusRequest } from "tweeter-shared";
import { ServerFacade } from "../../net/ServerFacade";

export class StatusService {
    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const respose = await new ServerFacade().loadMoreFeedItems(new LoadMoreStatusItemsRequest(authToken, user, pageSize, lastItem));
        return [respose.newItems, respose.hasMore];
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const respose = await new ServerFacade().loadMoreStoryItems(new LoadMoreStatusItemsRequest(authToken, user, pageSize, lastItem));
        console.log("Got back response in status service :" + respose.newItems);
        return [respose.newItems, respose.hasMore];
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        await new ServerFacade().postStatus(new PostStatusRequest(authToken, newStatus));
    };
}
