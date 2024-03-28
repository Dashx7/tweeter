import { RegisterRequest, AuthenticateResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService';
import { BAD_REQUEST, ErrorReporter } from './ResponseCodes';

export let handler = async (event: unknown): Promise<AuthenticateResponse> => {
    console.log('Register called in RegisterLambda.ts with event: ', event);
    let processedEvent: RegisterRequest = RegisterRequest.fromJson(event);

    if (processedEvent.alias == null) {
        throw new Error(BAD_REQUEST + 'Alias is null');
    }
    if (processedEvent.firstName == null) {
        throw new Error(BAD_REQUEST + 'First Name is null');
    }
    if (processedEvent.lastName == null) {
        throw new Error(BAD_REQUEST + 'Last Name is null');
    }
    if (processedEvent.password == null) {
        throw new Error(BAD_REQUEST + 'Password is null');
    }
    if (processedEvent.userImageBytes == null) {
        throw new Error(BAD_REQUEST + 'Image is null');
    }

    return await ErrorReporter(async () => {
        return new AuthenticateResponse(true, ...(await new UserService().register(processedEvent.alias, processedEvent.firstName, processedEvent.lastName, processedEvent.password, processedEvent.userImageBytes)));
    });
}