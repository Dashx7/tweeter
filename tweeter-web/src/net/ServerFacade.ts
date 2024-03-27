import { ClientCommunicator } from "./ClientCommunicator";
import { LoginRequest, AuthenticateResponse, GetFollowXCountRequest, XFollowRequest, XFollowResponse, GetFollowXCountResponse, GetUserRequest, GetUserResponse, LoadMoreXItemsRequest, LoadMoreXItemsResponse, LoadMoreFollowXRequest, LoadMoreFollowXResponse, LogoutRequest, VoidResponse, PostStatusRequest, RegisterRequest } from "tweeter-shared";

export class ServerFacade {

    private SERVER_URL = "https://8vzj6lcwcc.execute-api.us-east-1.amazonaws.com/TweeterStage"; //My Deployed API Gateway?

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    async Follow(request: XFollowRequest): Promise<XFollowResponse> {
        const endpoint = "/service/Follow";
        const response: JSON = await this.clientCommunicator.doPost<XFollowRequest>(request, endpoint);

        return XFollowResponse.fromJson(response);
    }
    async GetFolloweesCount(request: GetFollowXCountRequest): Promise<GetFollowXCountResponse> {
        const endpoint = "/service/GetFolloweesCount";
        const response: JSON = await this.clientCommunicator.doPost<GetFollowXCountRequest>(request, endpoint);

        return GetFollowXCountResponse.fromJson(response);
    }
    async GetFollowersCount(request: GetFollowXCountRequest): Promise<GetFollowXCountResponse> {
        const endpoint = "/service/GetFollowersCount";
        const response: JSON = await this.clientCommunicator.doPost<GetFollowXCountRequest>(request, endpoint);

        return GetFollowXCountResponse.fromJson(response);
    }
    async GetUser(request: GetUserRequest): Promise<GetUserResponse> {
        const endpoint = "/service/GetUser";
        const response: JSON = await this.clientCommunicator.doPost<GetUserRequest>(request, endpoint);

        return GetUserResponse.fromJson(response);
    }
    async LoadMoreFeedItems(request: LoadMoreXItemsRequest): Promise<LoadMoreXItemsResponse> {
        const endpoint = "/service/LoadMoreFeedItems";
        const response: JSON = await this.clientCommunicator.doPost<LoadMoreXItemsRequest>(request, endpoint);

        return LoadMoreXItemsResponse.fromJson(response);
    }
    async LoadMoreFollowees(request: LoadMoreFollowXRequest): Promise<LoadMoreFollowXResponse> {
        const endpoint = "/service/LoadMoreFollowees";
        const response: JSON = await this.clientCommunicator.doPost<LoadMoreFollowXRequest>(request, endpoint);

        return LoadMoreFollowXResponse.fromJson(response);
    }
    async LoadMoreFollowers(request: LoadMoreFollowXRequest): Promise<LoadMoreFollowXResponse> {
        const endpoint = "/service/LoadMoreFollowers";
        const response: JSON = await this.clientCommunicator.doPost<LoadMoreFollowXRequest>(request, endpoint);

        return LoadMoreFollowXResponse.fromJson(response);
    }
    async LoadMoreStoryItems(request: LoadMoreXItemsRequest): Promise<LoadMoreXItemsResponse> {
        const endpoint = "/service/LoadMoreStoryItems";
        const response: JSON = await this.clientCommunicator.doPost<LoadMoreXItemsRequest>(request, endpoint);

        return LoadMoreXItemsResponse.fromJson(response);
    }
    async Login(request: LoginRequest): Promise<AuthenticateResponse> {
        const endpoint = "/service/Login";
        const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

        return AuthenticateResponse.fromJson(response);
    }
    async Logout(request: LogoutRequest): Promise<VoidResponse> {
        const endpoint = "/service/Logout";
        const response: JSON = await this.clientCommunicator.doPost<LogoutRequest>(request, endpoint);

        return VoidResponse.fromJson(response);
    }
    async PostStatus(request: PostStatusRequest): Promise<VoidResponse> {
        const endpoint = "/service/PostStatus";
        const response: JSON = await this.clientCommunicator.doPost<PostStatusRequest>(request, endpoint);

        return VoidResponse.fromJson(response);
    }
    async Register(request: RegisterRequest): Promise<AuthenticateResponse> {
        const endpoint = "/service/Register";
        const response: JSON = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

        return AuthenticateResponse.fromJson(response);
    }
    async Unfollow(request: XFollowRequest): Promise<XFollowResponse> {
        const endpoint = "/service/Login";
        const response: JSON = await this.clientCommunicator.doPost<XFollowRequest>(request, endpoint);

        return XFollowResponse.fromJson(response);
    }
}