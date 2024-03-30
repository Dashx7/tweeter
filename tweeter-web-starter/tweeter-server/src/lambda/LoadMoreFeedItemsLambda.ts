import {
    LoadMoreStatusItemsRequest, LoadMoreStatusItemsResponse, Status
} from "tweeter-shared";
import {StatusService} from "../model/service/StatusService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: LoadMoreStatusItemsRequest): Promise<LoadMoreStatusItemsResponse> => {
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
        return new LoadMoreStatusItemsResponse(true, ...(await new StatusService().loadMoreFeedItems(event.authToken, event.user, event.pageSize, !!event.lastItem ? Status.fromJson(JSON.stringify(event.lastItem)) : null)));
    });
}