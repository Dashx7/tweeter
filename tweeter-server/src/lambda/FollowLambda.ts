import { XFollowRequest, XFollowResponse } from 'tweeter-shared'
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { FollowService } from '../model/service/FollowService';

export let handler = async (event: XFollowRequest): Promise<XFollowResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'AuthToken is null');
    }
    if (event.userToFollow == null) {
        throw new Error(BAD_REQUEST + 'User To Follow is null');
    }

    return await ErrorReporter(async () => {
        return new XFollowResponse(true, ...(await new FollowService().follow(event.authToken, event.userToFollow)));
    });
}