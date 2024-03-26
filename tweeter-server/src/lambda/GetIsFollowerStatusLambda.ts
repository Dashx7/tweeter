import { FollowService } from '../model/service/FollowService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse } from 'tweeter-shared';

export let handler = async (event: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + 'User is null');
    }
    if (event.selectedUser == null) {
        throw new Error(BAD_REQUEST + 'Selected user is null');
    }

    return await ErrorReporter(async () => {
        return new GetIsFollowerStatusResponse(true, await new FollowService().getIsFollowerStatus(event.authToken, event.user, event.selectedUser));
    });
}