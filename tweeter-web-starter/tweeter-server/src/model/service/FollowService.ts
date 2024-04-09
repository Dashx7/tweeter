import { AuthToken, User, FakeData } from "tweeter-shared";
import { BaseService } from "./BaseService";

export class FollowService extends BaseService {
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    }

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {

        return this.getFollowDAO().getIsFollowerStatus(authToken, user, selectedUser);
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {

        return this.getFollowDAO().getFolloweesCount(authToken, user);
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {

        return this.getFollowDAO().getFollowersCount(authToken, user);
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {

        this.getFollowDAO().follow(authToken, userToFollow);

        let followersCount = await this.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.getFolloweesCount(authToken, userToFollow);

        return [followersCount, followeesCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {

        this.getFollowDAO().unfollow(authToken, userToUnfollow);

        let followersCount = await this.getFollowersCount(authToken, userToUnfollow);
        let followeesCount = await this.getFolloweesCount(authToken, userToUnfollow);

        return [followersCount, followeesCount];
    };
}
