import { AuthToken, User } from "tweeter-shared";

export interface UserTableInterface {
    getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null>;
}