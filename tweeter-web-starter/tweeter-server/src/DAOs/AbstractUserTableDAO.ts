import { AuthToken, User } from "tweeter-shared";

export interface UserTableInterface {
    getUser(
        alias: string
    ): Promise<User | null>;

    getFolloweesCount(
        user: User
    ): Promise<number>;

    getFollowersCount(
        user: User
    ): Promise<number>;

}