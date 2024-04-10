import { AuthToken, User } from "tweeter-shared";

export interface UserTableInterface {
    getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null>;

    getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number>;

    getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number>;

}