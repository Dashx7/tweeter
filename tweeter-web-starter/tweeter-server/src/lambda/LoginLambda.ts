import { AuthenticateResponse, LoginRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { BAD_REQUEST, performErrorReportingOperation } from "./IntegrationResponseCommon";

export let handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    if (event.alias == null) {
        throw new Error(BAD_REQUEST + "alias is undefined");
    }
    if (event.password == null) {
        throw new Error(BAD_REQUEST + "password is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().login(event.alias, event.password)));
    });
}