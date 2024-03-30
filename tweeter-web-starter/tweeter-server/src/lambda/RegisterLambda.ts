import {AuthenticateResponse, LoginRequest, RegisterRequest} from "tweeter-shared";
import {UserService} from "../model/service/UserService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: RegisterRequest): Promise<AuthenticateResponse> => {
    if (event.alias == null) {
        throw new Error(BAD_REQUEST + "alias is undefined");
    }
    if (event.password == null) {
        throw new Error(BAD_REQUEST + "password is undefined");
    }
    if (event.firstName == null) {
        throw new Error(BAD_REQUEST + "firstName is undefined");
    }
    if (event.lastName == null) {
        throw new Error(BAD_REQUEST + "lastName is undefined");
    }
    if (event.userImageBase64 == null) {
        throw new Error(BAD_REQUEST + "userImageBase64 is undefined");
    }

    return await performErrorReportingOperation(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().register(
            event.firstName,
            event.lastName,
            event.alias,
            event.password,
            Uint8Array.from(Buffer.from(event.userImageBase64, 'base64'))
        )));
    });
}