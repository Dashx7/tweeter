import { LogoutRequest, VoidResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: LogoutRequest): Promise<VoidResponse> => {
    if (event.authToken == null) {
        throw new Error(BAD_REQUEST + 'Authtoken is null');
    }

    return await ErrorReporter(async () => {
        return new VoidResponse(true, await new UserService().logout(event.authToken));
    });
}