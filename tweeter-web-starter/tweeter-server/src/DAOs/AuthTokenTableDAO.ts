import { AuthToken, User } from "tweeter-shared";
import { AuthTokenTableInterface } from "./AbstractAuthTokenDAO";

export class AuthTokenTableDAO implements AuthTokenTableInterface {
    async login(alias: string, password: string): Promise<[User, AuthToken]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async logout(authToken: AuthToken): Promise<void> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        // TODO: Implement this method
        throw new Error("Method not implemented.");
    }
}