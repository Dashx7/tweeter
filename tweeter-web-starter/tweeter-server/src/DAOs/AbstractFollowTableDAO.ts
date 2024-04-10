import { AuthToken, User } from "tweeter-shared";

export interface FollowTableDAOInterface {
    loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]>;

    loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]>;

    getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean>;

    follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<String>;

    unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<String>;
}