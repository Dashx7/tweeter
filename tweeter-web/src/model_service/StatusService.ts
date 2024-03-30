import { AuthToken, User, Status, LoadMoreXItemsRequest, LoadMoreXItemsResponse, PostStatusRequest } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class StatusService {
    private myServerFacade: ServerFacade = new ServerFacade();
    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        // return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        const request: LoadMoreXItemsRequest = {
            authToken: authToken,
            user: user,
            pageSize: pageSize,
            lastItem: lastItem
        };
        const response: LoadMoreXItemsResponse = await this.myServerFacade.LoadMoreFeedItems(request);
        console.log("LoadMoreFeedItems response: ", response);
        return [response.newItems, response.hasMorePages];
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        // return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        const request: LoadMoreXItemsRequest = {
            authToken: authToken,
            user: user,
            pageSize: pageSize,
            lastItem: lastItem
        };
        const response: LoadMoreXItemsResponse = await this.myServerFacade.LoadMoreStoryItems(request);
        console.log("LoadMoreStoryItems response: ", response);
        return [response.newItems, response.hasMorePages];
    };

    public async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        // await new Promise((f) => setTimeout(f, 2000));
        const request: PostStatusRequest = {
            authToken: authToken,
            status: status
        };
        const response = await this.myServerFacade.PostStatus(request);
    }
}