import { FollowerOperationsRequest, GetFollowCountResponse } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

export let handler = async (event: FollowerOperationsRequest): Promise<GetFollowCountResponse> => {
    console.log("GetFolloweesCountLambda: handler: event: " + JSON.stringify(event));
    event = FollowerOperationsRequest.fromJson(event);
    console.log("GetFolloweesCountLambda: handler: event processed: " + JSON.stringify(event));
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + "user is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new GetFollowCountResponse(true, await new FollowService().getFolloweesCount(event.authToken, event.user));
    });
}