import { AuthToken, User } from "tweeter-shared";
import { BaseService } from "./BaseService";
import { AuthTokenTableDAO } from "../../DAOs/AuthTokenTableDAO";

export class FollowService extends BaseService {
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        const response = await this.getFollowDAO().loadMoreFollowers(authToken, user, pageSize, lastItem);
        console.log("Response from loadMoreFollowers: " + response.toString());
        const stringList: string[] = response[0];
        if (stringList.length == 0) {
            console.log("No users found in loadMoreFollowers");
            return [[], false];
        }
        const userList: User[] = [];
        for (let i = 0; i < stringList.length; i++) {
            const user = await this.getUserDAO().getUser(stringList[i]);
            console.log("User found in loadMoreFollowers: " + user);
            userList[i] = user;
        }
        return [userList, response[1]];
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        const response = await this.getFollowDAO().loadMoreFollowees(authToken, user, pageSize, lastItem);
        console.log("Response from loadMoreFollowees: " + response.toString());
        const stringList: string[] = response[0];
        if (stringList.length == 0) {
            console.log("No users found in loadMoreFollowees");
            return [[], false];
        }
        const userList: User[] = [];
        for (let i = 0; i < stringList.length; i++) {
            const user = await this.getUserDAO().getUser(stringList[i]);
            console.log("User found in loadMoreFollowees: " + user);
            userList[i] = user;
        }
        return [userList, response[1]];
    }

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        AuthTokenTableDAO.authenticate(authToken);

        return this.getFollowDAO().getIsFollowerStatus(authToken, user, selectedUser);
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        AuthTokenTableDAO.authenticate(authToken);
        return this.getUserDAO().getFolloweesCount(authToken, user);
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        AuthTokenTableDAO.authenticate(authToken);
        return this.getUserDAO().getFollowersCount(authToken, user);
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        AuthTokenTableDAO.authenticate(authToken);

        const aliasOfFollower = await this.getFollowDAO().follow(authToken, userToFollow);
        console.log("Attempting to update follower and followee count");
        this.getUserDAO().follow(aliasOfFollower, userToFollow.alias);
        const followersCount = await this.getUserDAO().getFollowersCount(authToken, userToFollow);
        const followeesCount = await this.getUserDAO().getFolloweesCount(authToken, userToFollow);

        return [followersCount, followeesCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        AuthTokenTableDAO.authenticate(authToken);

        const aliasOfFollower = await this.getFollowDAO().unfollow(authToken, userToUnfollow);
        this.getUserDAO().unfollow(aliasOfFollower, userToUnfollow.alias);
        const followersCount = await this.getUserDAO().getFollowersCount(authToken, userToUnfollow);
        const followeesCount = await this.getUserDAO().getFolloweesCount(authToken, userToUnfollow);

        return [followersCount, followeesCount];
    };
}
