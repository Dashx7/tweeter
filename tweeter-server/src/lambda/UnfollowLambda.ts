import { XFollowRequest, XFollowResponse } from 'tweeter-shared'
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { FollowService } from '../model/service/FollowService';

export let handler = async (event: unknown): Promise<XFollowResponse> => {
    console.log('Unfollow called in UnfollowLambda.ts with event: ', event);
    let processedEvent: XFollowRequest = XFollowRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'AuthToken is null');
    }
    if (processedEvent.userToXFollow == null) {
        throw new Error(BAD_REQUEST + 'User To Follow is null');
    }

    return await ErrorReporter(async () => {
        return new XFollowResponse(true, ...(await new FollowService().unfollow(processedEvent.authToken, processedEvent.userToXFollow)));
    });
}