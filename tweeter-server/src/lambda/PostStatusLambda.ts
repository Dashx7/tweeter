import { StatusService } from '../model/service/StatusService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { PostStatusRequest, VoidResponse } from 'tweeter-shared';

export let handler = async (event: unknown): Promise<VoidResponse> => {
    console.log('PostStatus called in PostStatusLambda.ts with event: ', event);
    let processedEvent: PostStatusRequest = PostStatusRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.status == null) {
        throw new Error(BAD_REQUEST + 'Status is null');
    }

    return await ErrorReporter(async () => {
        return new VoidResponse(true, await new StatusService().postStatus(processedEvent.authToken, processedEvent.status));
    });
}

