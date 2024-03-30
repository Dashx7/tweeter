import {
    LoadMoreUserItemsRequest, LoadMoreUserItemsResponse
} from "tweeter-shared";
import {FollowService} from "../model/service/FollowService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: LoadMoreUserItemsRequest): Promise<LoadMoreUserItemsResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + "user is undefined");
    }
    if (event.pageSize == null) {
        throw new Error(BAD_REQUEST + "pageSize is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new LoadMoreUserItemsResponse(true, ...(await new FollowService().loadMoreFollowees(event.authToken, event.user, event.pageSize, event.lastItem)));
    });
}