import { StatusService } from '../model/service/StatusService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { PostStatusRequest, VoidResponse } from 'tweeter-shared';

export let handler = async (event: PostStatusRequest): Promise<VoidResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (event.status == null) {
        throw new Error(BAD_REQUEST + 'Status is null');
    }

    return await ErrorReporter(async () => {
        return new VoidResponse(true, await new StatusService().postStatus(event.authToken, event.status));
    });
}

