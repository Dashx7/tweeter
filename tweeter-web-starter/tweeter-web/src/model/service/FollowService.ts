import {
    AuthToken,
    User,
    LoadMoreUserItemsRequest,
    GetIsFollowerRequest,
    FollowerOperationsRequest
} from "tweeter-shared";
import {ServerFacade} from "../../net/ServerFacade";

export class FollowService {
    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const response = await new ServerFacade().loadMoreFollowers(new LoadMoreUserItemsRequest(authToken, user, pageSize, lastItem));
        return [response.newItems, response.hasMore];
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        const response = await new ServerFacade().loadMoreFollowees(new LoadMoreUserItemsRequest(authToken, user, pageSize, lastItem));
        return [response.newItems, response.hasMore];
    }

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        return (await new ServerFacade().getIsFollowerStatus(new GetIsFollowerRequest(authToken, user, selectedUser))).isFollower;
    };

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        return (await new ServerFacade().getFolloweesCount(new FollowerOperationsRequest(authToken, user))).followCount;
    };

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        return (await new ServerFacade().getFollowersCount(new FollowerOperationsRequest(authToken, user))).followCount;
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        const response = await new ServerFacade().follow(new FollowerOperationsRequest(authToken, userToFollow));

        return [response.followersCount, response.followingCount];
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        const response = await new ServerFacade().unfollow(new FollowerOperationsRequest(authToken, userToUnfollow));

        return [response.followersCount, response.followingCount];
    };
}
