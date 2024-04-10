import { AuthToken, FakeData, User } from "tweeter-shared";
import { BaseService } from "./BaseService";
import { AuthTokenTableDAO } from "../../DAOs/AuthTokenTableDAO";

export class UserService extends BaseService {
    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {

        let user = FakeData.instance.firstUser;

        if (user === null) {
            throw new Error("Invalid alias or password");
        }

        return await this.getAuthTokenDAO().login(alias, password);
    };


    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        console.log("Registering user with image bytes: " + userImageBytes.byteLength + userImageBytes);
        const response = await this.getAuthTokenDAO().register(firstName, lastName, alias, password, userImageBytes);
        console.log(response);
        return response;
    };

    public async logout(authToken: AuthToken): Promise<void> {
        return await this.getAuthTokenDAO().logout(authToken);
    };

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        AuthTokenTableDAO.authenticate(authToken);

        return await this.getUserDAO().getUser(alias);
    };
}