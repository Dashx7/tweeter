import { RegisterRequest, AuthenticateResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: RegisterRequest): Promise<AuthenticateResponse> => {
    if (event.alias == null) {
        throw new Error(BAD_REQUEST + 'Alias is null');
    }
    if (event.firstName == null) {
        throw new Error(BAD_REQUEST + 'First Name is null');
    }
    if (event.lastName == null) {
        throw new Error(BAD_REQUEST + 'Last Name is null');
    }
    if (event.password == null) {
        throw new Error(BAD_REQUEST + 'Password is null');
    }
    if (event.userImageBytes == null) {
        throw new Error(BAD_REQUEST + 'Image is null');
    }

    return await ErrorReporter(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().register(event.alias, event.firstName, event.lastName, event.password, event.userImageBytes)));
    });
}