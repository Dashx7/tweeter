import { AuthToken, User, FakeData } from 'tweeter-shared';


export class FollowService {
    //private DAO
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweesCount(user);
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowersCount(user);
    };
    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[number, number]> {
        // Pause so we can see the following message. Remove when connected to the server
        console.log("1.1")
        await new Promise((f) => setTimeout(f, 2000));
        console.log("1.2")
        // TODO: Call the server
        let followersCountTemp = await this.getFollowersCount(authToken, userToFollow);
        let followeesCountTemp = await this.getFolloweesCount(authToken, userToFollow);
        return [followersCountTemp, followeesCountTemp];
    };
    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[number, number]> {
        console.log("1.1")
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        console.log("1.2")
        // TODO: Call the server

        let followersCountTemp = await this.getFollowersCount(authToken, userToUnfollow);
        let followeesCountTemp = await this.getFolloweesCount(authToken, userToUnfollow);
        return [followersCountTemp, followeesCountTemp];
    };
}