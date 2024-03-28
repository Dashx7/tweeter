import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { GetUserRequest, GetUserResponse } from 'tweeter-shared';

export let handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    console.log('GetUser called in GetUserLambda.ts with event: ', event);
    let processedEvent: GetUserRequest = GetUserRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (processedEvent.alias == null) {
        throw new Error(BAD_REQUEST + 'Alias is null');
    }

    return await ErrorReporter(async () => {
        return new GetUserResponse(true, await new UserService().getUser(processedEvent.authToken, processedEvent.alias));
    });
}