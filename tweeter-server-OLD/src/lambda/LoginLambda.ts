import { LoginRequest, AuthenticateResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: unknown): Promise<AuthenticateResponse> => {
    console.log('Login called in LoginLambda.ts with event: ', event);
    let processedEvent: LoginRequest = LoginRequest.fromJson(event);

    if (processedEvent.username == null) {
        throw new Error(BAD_REQUEST + 'username is null');
    }
    if (processedEvent.password == null) {
        throw new Error(BAD_REQUEST + 'password is null');
    }

    return await ErrorReporter(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().login(processedEvent.username, processedEvent.password)));
    });
}