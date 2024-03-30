import {AuthenticateResponse, LoginRequest, LogoutRequest, VoidResponse} from "tweeter-shared";
import {UserService} from "../model/service/UserService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: LogoutRequest): Promise<VoidResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }

    return await performErrorReportingOperation(async () => {
        await new UserService().logout(event.authToken);
        return new VoidResponse(true);
    });
}