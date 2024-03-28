import { FollowService } from '../model/service/FollowService';
import { GetFollowXCountRequest, GetFollowXCountResponse } from 'tweeter-shared';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: unknown): Promise<GetFollowXCountResponse> => {
    console.log('GetFollowersCount called in GetFollowersCountLambda.ts with event: ', event);
    let processedEvent: GetFollowXCountRequest = GetFollowXCountRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.user == null) {
        throw new Error(BAD_REQUEST + 'User is null');
    }

    return await ErrorReporter(async () => {
        return new GetFollowXCountResponse(true, await new FollowService().getFollowersCount(processedEvent.authToken, processedEvent.user));
    });
}