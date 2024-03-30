import { ClientCommunicator } from "./ClientCommunicator";
import {
    AuthenticateResponse, FollowActionResponse,
    FollowerOperationsRequest,
    GetFollowCountResponse,
    GetIsFollowerRequest,
    GetIsFollowerResponse,
    LoadMoreStatusItemsRequest,
    LoadMoreStatusItemsResponse,
    LoadMoreUserItemsRequest,
    LoadMoreUserItemsResponse,
    LoginRequest,
    PostStatusRequest,
    RegisterRequest,
    VoidResponse
} from "tweeter-shared";
import { GetUserRequest, LogoutRequest } from "tweeter-shared/dist/model/net/Request";
import { GetUserResponse } from "tweeter-shared/dist/model/net/Response";

export class ServerFacade {
    private SERVER_URL = "https://8vzj6lcwcc.execute-api.us-east-1.amazonaws.com/TweeterStage";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async login(request: LoginRequest): Promise<AuthenticateResponse> {
        return AuthenticateResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/Login"));
    }

    async register(request: RegisterRequest): Promise<AuthenticateResponse> {
        return AuthenticateResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/Register"));
    }

    async logout(request: LogoutRequest): Promise<VoidResponse> {
        return VoidResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/Logout"));
    }

    async getUser(request: GetUserRequest): Promise<GetUserResponse> {
        return GetUserResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/GetUser"));
    }

    async loadMoreStoryItems(request: LoadMoreStatusItemsRequest): Promise<LoadMoreStatusItemsResponse> {
        return LoadMoreStatusItemsResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/LoadMoreStoryItems"));
    }

    async loadMoreFeedItems(request: LoadMoreStatusItemsRequest): Promise<LoadMoreStatusItemsResponse> {
        return LoadMoreStatusItemsResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/LoadMoreFeedItems"));
    }

    async postStatus(request: PostStatusRequest): Promise<VoidResponse> {
        return VoidResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/PostStatus"));
    }

    async loadMoreFollowers(request: LoadMoreUserItemsRequest): Promise<LoadMoreUserItemsResponse> {
        return LoadMoreUserItemsResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/LoadMoreFollowers"));
    }

    async loadMoreFollowees(request: LoadMoreUserItemsRequest): Promise<LoadMoreUserItemsResponse> {
        return LoadMoreUserItemsResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/LoadMoreFollowees"));
    }

    async getIsFollowerStatus(request: GetIsFollowerRequest): Promise<GetIsFollowerResponse> {
        return GetIsFollowerResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/GetIsFollowerStatus"));
    }

    async getFollowersCount(request: FollowerOperationsRequest): Promise<GetFollowCountResponse> {
        return GetFollowCountResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/GetFollowersCount"));
    }

    async getFolloweesCount(request: FollowerOperationsRequest): Promise<GetFollowCountResponse> {
        return GetFollowCountResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/GetFolloweesCount"));
    }

    async follow(request: FollowerOperationsRequest): Promise<FollowActionResponse> {
        return FollowActionResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/Follow"));
    }

    async unfollow(request: FollowerOperationsRequest): Promise<FollowActionResponse> {
        return FollowActionResponse.fromJson(await this.clientCommunicator.doPost(request, "/service/Unfollow"));
    }
}