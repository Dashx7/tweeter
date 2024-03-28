import { FollowService } from '../model/service/FollowService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { GetIsFollowerStatusRequest, GetIsFollowerStatusResponse } from 'tweeter-shared';

export let handler = async (event: unknown): Promise<GetIsFollowerStatusResponse> => {
    console.log('GetIsFollowerStatus called in GetIsFollowerStatusLambda.ts with event: ', event);
    let processedEvent: GetIsFollowerStatusRequest = GetIsFollowerStatusRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.user == null) {
        throw new Error(BAD_REQUEST + 'User is null');
    }
    if (processedEvent.selectedUser == null) {
        throw new Error(BAD_REQUEST + 'Selected user is null');
    }

    return await ErrorReporter(async () => {
        return new GetIsFollowerStatusResponse(true, await new FollowService().getIsFollowerStatus(processedEvent.authToken, processedEvent.user, processedEvent.selectedUser));
    });
}