import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';
import { GetUserRequest, GetUserResponse } from 'tweeter-shared';

export let handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'Auth token is null');
    }
    if (event.alias == null) {
        throw new Error(BAD_REQUEST + 'Alias is null');
    }

    return await ErrorReporter(async () => {
        return new GetUserResponse(true, await new UserService().getUser(event.authToken, event.alias));
    });
}