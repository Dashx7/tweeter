import { AuthToken, User, XFollowRequest, XFollowResponse } from 'tweeter-shared'
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { FollowService } from '../model/service/FollowService';

export let handler = async (event: unknown): Promise<XFollowResponse> => {
    console.log('Follow called in FollowLambda.ts with event: ', event);
    let processedEvent: XFollowRequest = XFollowRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'AuthToken is null');
    }
    if (processedEvent.userToXFollow == null) {
        throw new Error(BAD_REQUEST + 'User To Follow is null');
    }

    return await ErrorReporter(async () => {
        return new XFollowResponse(true, ...(await new FollowService().follow(processedEvent.authToken, processedEvent.userToXFollow)));
    });
}