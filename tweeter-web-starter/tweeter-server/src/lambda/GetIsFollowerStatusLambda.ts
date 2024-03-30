import {
    AuthToken,
    GetIsFollowerRequest, GetIsFollowerResponse, User
} from "tweeter-shared";
import {FollowService} from "../model/service/FollowService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: GetIsFollowerRequest): Promise<GetIsFollowerResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + "user is undefined");
    }
    if (event.selectedUser == null) {
        throw new Error(BAD_REQUEST + "selectedUser is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new GetIsFollowerResponse(true, await new FollowService().getIsFollowerStatus(event.authToken, event.user, event.selectedUser));
    });
}