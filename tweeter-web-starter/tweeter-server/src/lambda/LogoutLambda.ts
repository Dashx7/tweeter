import { LogoutRequest, VoidResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

export let handler = async (event: LogoutRequest): Promise<VoidResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }

    console.log("Logging out user with authToken: " + event.authToken);
    event = LogoutRequest.fromJson(event);
    console.log("processed event: " + JSON.stringify(event));

    return await performErrorReportingOperation(async () => {
        await new UserService().logout(event.authToken);
        return new VoidResponse(true);
    });
}