import { LoadMoreStatusItemsRequest, LoadMoreStatusItemsResponse } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

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
    //Last item can be null
    console.log("Event: " + JSON.stringify(event));
    const processedEvent = LoadMoreStatusItemsRequest.fromJson(event); // T
    console.log("Processed Event: " + JSON.stringify(processedEvent));

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined after processing");
    }
    if (processedEvent.user == null) {
        throw new Error(BAD_REQUEST + "user is undefined after processing");
    }
    if (processedEvent.pageSize == null) {
        throw new Error(BAD_REQUEST + "pageSize is undefined after processing");
    }
    //Last item can be null


    return await performErrorReportingOperation(async () => {
        return new LoadMoreStatusItemsResponse(true, ...(await new StatusService().loadMoreStoryItems(processedEvent.authToken, processedEvent.user, processedEvent.pageSize, processedEvent.lastItem)));
    });
}