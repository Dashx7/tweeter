import { FollowService } from '../model/service/FollowService';
import { GetFollowXCountRequest, GetFollowXCountResponse } from 'tweeter-shared';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: GetFollowXCountRequest): Promise<GetFollowXCountResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'An error occurred');
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + 'An error occurred');
    }

    return await ErrorReporter(async () => {
        return new GetFollowXCountResponse(true, await new FollowService().getFolloweesCount(event.authToken, event.user));
    });
}