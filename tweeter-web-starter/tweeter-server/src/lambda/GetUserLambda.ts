import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

export let handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    console.log("GetUserRequest: " + JSON.stringify(event));
    event = GetUserRequest.fromJson(event);
    console.log("GetUserRequest Processed: " + JSON.stringify(event));

    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.alias == null) {
        throw new Error(BAD_REQUEST + "alias is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new GetUserResponse(true, await new UserService().getUser(event.authToken, event.alias));
    });
}