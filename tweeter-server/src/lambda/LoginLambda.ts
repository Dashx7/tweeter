import { LoginRequest, AuthenticateResponse, GetFollowXCountRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReport } from './ResponseCodes';

export let handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    if (event.username == null) {
        throw new Error(BAD_REQUEST + 'An error occurred');
    }
    if (event.password == null) {
        throw new Error(BAD_REQUEST + 'An error occurred');
    }

    return await ErrorReport(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().login(event.username, event.password)));
    });
}