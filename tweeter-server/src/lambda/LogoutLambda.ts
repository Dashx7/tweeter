import { LogoutRequest, VoidResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: unknown): Promise<VoidResponse> => {
    console.log('Logout called in LogoutLambda.ts with event: ', event);
    let processedEvent: LogoutRequest = LogoutRequest.fromJson(event);

    if (processedEvent.authToken == null) {
        throw new Error(BAD_REQUEST + 'Authtoken is null');
    }

    return await ErrorReporter(async () => {
        return new VoidResponse(true, await new UserService().logout(processedEvent.authToken));
    });
}