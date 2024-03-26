import { LoginRequest, AuthenticateResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    if (event.username == null) {
        throw new Error(BAD_REQUEST + 'username is null');
    }
    if (event.password == null) {
        throw new Error(BAD_REQUEST + 'password is null');
    }

    return await ErrorReporter(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().login(event.username, event.password)));
    });
}