import { FollowService } from '../model/service/FollowService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { LoadMoreFollowXRequest, LoadMoreFollowXResponse } from 'tweeter-shared';

export let handler = async (event: unknown): Promise<LoadMoreFollowXResponse> => {
    console.log('LoadMoreFollowers called in LoadMoreFollowersLambda.ts with event: ', event);
    let processedEvent: LoadMoreFollowXRequest = LoadMoreFollowXRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.user == null) {
        throw new Error(BAD_REQUEST + 'User is null');
    }
    if (processedEvent.pageSize == null) {
        throw new Error(BAD_REQUEST + 'PageSize is null');
    }

    return await ErrorReporter(async () => {
        return new LoadMoreFollowXResponse(true, ...(await new FollowService().loadMoreFollowers(processedEvent.authToken, processedEvent.user, processedEvent.pageSize, processedEvent.lastItem,)));
    });
}