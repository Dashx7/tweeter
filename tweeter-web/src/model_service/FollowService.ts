import { AuthToken, User, GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, GetFollowXCountRequest, GetFollowXCountResponse, XFollowRequest, XFollowResponse, LoadMoreFollowXRequest, LoadMoreFollowXResponse } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class FollowService {
    private myServerFacade: ServerFacade = new ServerFacade();
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server

        const request: LoadMoreFollowXRequest = {
            authToken: authToken,
            user: user,
            pageSize: pageSize,
            lastItem: lastItem
        };
        const response: LoadMoreFollowXResponse = await this.myServerFacade.LoadMoreFollowers(request);

        return [response.Users, response.hasMoreFollowX];
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        // return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
        const request: LoadMoreFollowXRequest = {
            authToken: authToken,
            user: user,
            pageSize: pageSize,
            lastItem: lastItem
        };
        const response: LoadMoreFollowXResponse = await this.myServerFacade.LoadMoreFollowees(request);

        return [response.Users, response.hasMoreFollowX];
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        // return FakeData.instance.isFollower(); // Old Way
        const request: GetIsFollowerStatusRequest = {
            authToken: authToken,
            user: user,
            selectedUser: selectedUser
        };
        const response: GetIsFollowerStatusResponse = await this.myServerFacade.GetIsFollowerStatus(request);

        return response.getIsFollower();
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        // return FakeData.instance.getFolloweesCount(user);
        const request: GetFollowXCountRequest = {
            authToken: authToken,
            user: user
        };
        const response: GetFollowXCountResponse = await this.myServerFacade.GetFolloweesCount(request);
        let followerCountToReturn = response.getCount();
        return followerCountToReturn;
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        // return FakeData.instance.getFollowersCount(user);
        const request: GetFollowXCountRequest = {
            authToken: authToken,
            user: user
        };
        const response: GetFollowXCountResponse = await this.myServerFacade.GetFollowersCount(request);
        let followerCountToReturn = response.getCount();
        return followerCountToReturn;
    };
    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[number, number]> {
        // Pause so we can see the following message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        const request: XFollowRequest = {
            authToken: authToken,
            userToXFollow: userToFollow
        };
        const response: XFollowResponse = await this.myServerFacade.Follow(request);

        return [response.followers, response.followees];
    };
    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[number, number]> {
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server
        const request: XFollowRequest = {
            authToken: authToken,
            userToXFollow: userToUnfollow
        };
        console.log("Unfollow called in e.ts"); //BREAKS HERE
        const response: XFollowResponse = await this.myServerFacade.Unfollow(request);
        // console.log("Unfollow response: ", response);
        return [response.followers, response.followees];
    };
}