import { FollowService } from '../model/service/FollowService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { LoadMoreFollowXRequest, LoadMoreFollowXResponse } from 'tweeter-shared';

export let handler = async (event: LoadMoreFollowXRequest): Promise<LoadMoreFollowXResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (event.user == null) {
        throw new Error(BAD_REQUEST + 'User is null');
    }
    if (event.pageSize == null) {
        throw new Error(BAD_REQUEST + 'PageSize is null');
    }

    return await ErrorReporter(async () => {
        return new LoadMoreFollowXResponse(true, ...(await new FollowService().loadMoreFollowers(event.authToken, event.user, event.pageSize, event.lastItem,)));
    });
}