import { StatusService } from '../model/service/StatusService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { LoadMoreXItemsRequest, LoadMoreXItemsResponse } from 'tweeter-shared';

export let handler = async (event: LoadMoreXItemsRequest): Promise<LoadMoreXItemsResponse> => {
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
        return new LoadMoreXItemsResponse(true, ...(await new StatusService().loadMoreFeedItems(event.authToken, event.user, event.pageSize, event.lastItem,)));
    }); //FIXME? Might need to use the weird code 
}

