import { AuthToken, User } from "tweeter-shared";
export abstract class FollowTableDAOInterface {
    abstract loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]>;

    abstract loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]>;

    abstract getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean>;

    abstract getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number>;

    abstract getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number>;

    abstract follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[number, number]>;

    abstract unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[number, number]>;
}