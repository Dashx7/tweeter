import { FollowActionResponse, FollowerOperationsRequest } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

export let handler = async (event: FollowerOperationsRequest): Promise<FollowActionResponse> => {
    console.log("FollowerOperationsRequest: " + JSON.stringify(event));
    event = FollowerOperationsRequest.fromJson(event);
    console.log("FollowerOperationsRequest Processed: " + JSON.stringify(event));

    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + "user is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new FollowActionResponse(true, ...await new FollowService().unfollow(event.authToken, event.user));
    });
};