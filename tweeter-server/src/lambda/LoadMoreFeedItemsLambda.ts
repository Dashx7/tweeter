import { StatusService } from '../model/service/StatusService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { LoadMoreXItemsRequest, LoadMoreXItemsResponse } from 'tweeter-shared';

export let handler = async (event: unknown): Promise<LoadMoreXItemsResponse> => {
    console.log('LoadMoreFeedItems called in LoadMoreFeedItemsLambda.ts with event: ', event);
    let processedEvent: LoadMoreXItemsRequest = LoadMoreXItemsRequest.fromJson(event);

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
        return new LoadMoreXItemsResponse(true, ...(await new StatusService().loadMoreFeedItems(processedEvent.authToken, processedEvent.user, processedEvent.pageSize, processedEvent.lastItem,)));
    }); //FIXME? Might need to use the weird code 
}

