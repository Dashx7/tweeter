import { AuthToken, User } from "tweeter-shared";

export interface AuthTokenTableInterface {
    login(alias: string, password: string): Promise<[User, AuthToken]>;

    logout(authToken: AuthToken): Promise<void>;

    register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]>;
}