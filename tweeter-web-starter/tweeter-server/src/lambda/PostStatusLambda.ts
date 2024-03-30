import {
    PostStatusRequest,
    VoidResponse
} from "tweeter-shared";
import {StatusService} from "../model/service/StatusService";
import {BAD_REQUEST, performErrorReportingOperation} from "./IntegrationResponseCommon";

export let handler = async (event: PostStatusRequest): Promise<VoidResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + "authToken is undefined");
    }
    if (event.newStatus == null) {
        throw new Error(BAD_REQUEST + "newStatus is undefined");
    }

    return await performErrorReportingOperation(async () => {
        await new StatusService().postStatus(event.authToken, event.newStatus)
        return new VoidResponse(true);
    });
}