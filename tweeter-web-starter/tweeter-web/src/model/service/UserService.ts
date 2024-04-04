import { AuthToken, GetUserRequest, LoginRequest, LogoutRequest, RegisterRequest, User } from "tweeter-shared";
import { ServerFacade } from "../../net/ServerFacade";
import { Buffer } from "buffer";

export class UserService {
    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        const response = await new ServerFacade().login(new LoginRequest(alias, password));
        return [response.user, response.token];
    };

    public async logout(authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new ServerFacade().logout(new LogoutRequest(authToken))
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        console.log("Registering user with image bytes: " + userImageBytes.byteLength + userImageBytes);
        const response = await new ServerFacade().register(new RegisterRequest(firstName, lastName, alias, password, Buffer.from(userImageBytes).toString('base64')));
        return [response.user, response.token];
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        return (await new ServerFacade().getUser(new GetUserRequest(authToken, alias))).user;
    };
}
