import { AuthToken, User } from "tweeter-shared";

export interface FollowTableDAOInterface {
    loadMoreFollowers(
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]>;

    loadMoreFollowees(
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[string[], boolean]>;

    getIsFollowerStatus(
        user: User,
        selectedUser: User
    ): Promise<boolean>;

    follow(
        originalUser: User,
        userToFollow: User
    ): Promise<String>;

    unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<String>;
}