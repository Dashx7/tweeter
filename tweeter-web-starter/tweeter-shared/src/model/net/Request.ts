import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import { Status } from "../domain/Status";

export abstract class TweeterRequest { }

export class LoginRequest extends TweeterRequest {
    alias: string;
    password: string;

    constructor(username: string, password: string) {
        super();
        this.alias = username;
        this.password = password;
    }
}

export class RegisterRequest extends TweeterRequest {
    firstName: string;
    lastName: string;
    alias: string;
    password: string;
    userImageBase64: string;

    constructor(firstName: string, lastName: string, alias: string, password: string, userImageBase64: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.alias = alias;
        this.password = password;
        this.userImageBase64 = userImageBase64;
    }
}

export class LogoutRequest extends TweeterRequest {
    authToken: AuthToken;

    constructor(authToken: AuthToken) {
        super();
        this.authToken = authToken;
    }

    static fromJson(logoutRequest: LogoutRequest): LogoutRequest {
        interface LogoutRequestJson {
            authToken: AuthToken;
        }
        const jsonObject: LogoutRequestJson = logoutRequest as unknown as LogoutRequestJson;
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        if (deserializedAuthToken === null) {
            throw new Error(
                "LogoutRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        return new LogoutRequest(
            deserializedAuthToken
        );
    }

}

export class GetUserRequest extends TweeterRequest {
    authToken: AuthToken;
    alias: string;

    constructor(authToken: AuthToken, alias: string) {
        super();
        this.authToken = authToken;
        this.alias = alias;
    }

    static fromJson(getUserRequest: GetUserRequest): GetUserRequest {
        interface GetUserRequestJson {
            authToken: AuthToken;
            alias: string;
        }
        const jsonObject: GetUserRequestJson = getUserRequest as unknown as GetUserRequestJson;
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        if (deserializedAuthToken === null) {
            throw new Error(
                "GetUserRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        return new GetUserRequest(
            deserializedAuthToken,
            jsonObject.alias
        );
    }
}

export class LoadMoreStatusItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: Status | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
    static fromJson(loadMoreStatusItemsRequest: LoadMoreStatusItemsRequest): LoadMoreStatusItemsRequest {
        interface LoadMoreStatusItemsRequestJson {
            authToken: AuthToken;
            user: User;
            pageSize: number;
            lastItem: Status | null;
        }
        const jsonObject: LoadMoreStatusItemsRequestJson = loadMoreStatusItemsRequest as unknown as LoadMoreStatusItemsRequestJson;
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        let deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));
        let deserializedLastItem = jsonObject.lastItem ? Status.fromJson(JSON.stringify(jsonObject.lastItem)) : null;
        if (deserializedAuthToken === null) {
            throw new Error(
                "LoadMoreStatusItemsRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        if (deserializedUser === null) {
            throw new Error(
                "LoadMoreStatusItemsRequest, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject.user)
            );
        }
        return new LoadMoreStatusItemsRequest(
            deserializedAuthToken,
            deserializedUser,
            jsonObject.pageSize,
            deserializedLastItem
        );
    }
}

export class PostStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    newStatus: Status;

    constructor(authToken: AuthToken, newStatus: Status) {
        super();
        this.authToken = authToken;
        this.newStatus = newStatus;
    }

    static fromJson(postStatusRequest: PostStatusRequest): PostStatusRequest {
        interface PostStatusRequestJson {
            authToken: AuthToken;
            newStatus: Status;
        }
        const jsonObject: PostStatusRequestJson = postStatusRequest as unknown as PostStatusRequestJson;
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        let deserializedStatus = Status.fromJson(JSON.stringify(jsonObject.newStatus));
        if (deserializedAuthToken === null) {
            throw new Error(
                "PostStatusRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        if (deserializedStatus === null) {
            throw new Error(
                "PostStatusRequest, could not deserialize status with json:\n" +
                JSON.stringify(jsonObject.newStatus)
            );
        }
        return new PostStatusRequest(
            deserializedAuthToken,
            deserializedStatus
        );
    }
}

export class LoadMoreUserItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: User | null;

    constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }
    static fromJson(loadMoreUserItemsRequest: LoadMoreUserItemsRequest): LoadMoreUserItemsRequest {
        interface LoadMoreUserItemsRequestJson {
            authToken: AuthToken;
            user: User;
            pageSize: number;
            lastItem: User | null;
        }
        const jsonObject: LoadMoreUserItemsRequestJson = loadMoreUserItemsRequest as unknown as LoadMoreUserItemsRequestJson;
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        let deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));
        let deserializedLastItem = jsonObject.lastItem ? User.fromJson(JSON.stringify(jsonObject.lastItem)) : null;
        if (deserializedAuthToken === null) {
            throw new Error(
                "LoadMoreUserItemsRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        if (deserializedUser === null) {
            throw new Error(
                "LoadMoreUserItemsRequest, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject.user)
            );
        }
        return new LoadMoreUserItemsRequest(
            deserializedAuthToken,
            deserializedUser,
            jsonObject.pageSize,
            deserializedLastItem
        );
    }
}

export class GetIsFollowerRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    selectedUser: User;

    constructor(authToken: AuthToken, user: User, selectedUser: User) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.selectedUser = selectedUser;
    }

    static fromJson(getIsFollowerRequest: GetIsFollowerRequest): GetIsFollowerRequest {
        console.log("Attempting to deserialize GetIsFollowerRequest");
        interface GetIsFollowerRequestJson {
            authToken: AuthToken;
            user: User;
            selectedUser: User;
        }
        const jsonObject: GetIsFollowerRequestJson = getIsFollowerRequest as unknown as GetIsFollowerRequestJson;
        console.log("jsonObject: " + JSON.stringify(jsonObject));
        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        console.log("deserializedAuthToken: " + JSON.stringify(deserializedAuthToken));
        let deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));
        console.log("deserializedUser: " + JSON.stringify(deserializedUser));
        let deserializedSelectedUser = User.fromJson(JSON.stringify(jsonObject.selectedUser));
        console.log("deserializedSelectedUser: " + JSON.stringify(deserializedSelectedUser));
        if (deserializedAuthToken === null) {
            throw new Error(
                "GetIsFollowerRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }
        if (deserializedUser === null) {
            throw new Error(
                "GetIsFollowerRequest, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject.user)
            );
        }
        if (deserializedSelectedUser === null) {
            throw new Error(
                "GetIsFollowerRequest, could not deserialize selectedUser with json:\n" +
                JSON.stringify(jsonObject.selectedUser)
            );
        }
        console.log("GetIsFollowerRequest.fromJson: deserializedAuthToken: " + JSON.stringify(deserializedAuthToken));
        return new GetIsFollowerRequest(
            deserializedAuthToken,
            deserializedUser,
            deserializedSelectedUser
        );
        // const authToken = AuthToken.fromJson(json.authToken);
        // const user = User.fromJson(json.user);
        // const selectedUser = User.fromJson(json.selectedUser);
        // return new GetIsFollowerRequest(authToken!, user!, selectedUser!);
    }
}

export class FollowerOperationsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User) {
        super();
        this.authToken = authToken;
        this.user = user;
    }

    static fromJson(followerOperationRequest: FollowerOperationsRequest): FollowerOperationsRequest {
        interface FollowerOperationsRequestJson {
            authToken: AuthToken;
            user: User;
        }
        // console.log("FollowerOperationsRequest.fromJson: json: " + JSON.stringify(followerOperationRequest));

        const jsonObject: FollowerOperationsRequestJson =
            followerOperationRequest as unknown as FollowerOperationsRequestJson;

        // console.log("FollowerOperationsRequest.fromJson: jsonObject: " + JSON.stringify(jsonObject));

        let deserializedAuthToken = AuthToken.fromJson(JSON.stringify(jsonObject.authToken));
        let deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));
        // console.log("FollowerOperationsRequest.fromJson: deserializedAuthToken: " + JSON.stringify(deserializedAuthToken));
        // console.log("FollowerOperationsRequest.fromJson: deserializedUser: " + JSON.stringify(deserializedUser));

        if (deserializedAuthToken === null) {
            throw new Error(
                "FollowerOperationsRequest, could not deserialize authToken with json:\n" +
                JSON.stringify(jsonObject.authToken)
            );
        }

        if (deserializedUser === null) {
            throw new Error(
                "FollowerOperationsRequest, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject.user)
            );
        }
        if (deserializedAuthToken == null || deserializedUser == null) {
            throw new Error(
                "FollowerOperationsRequest, Auth or user is implicitly null with json:\n" +
                JSON.stringify(jsonObject.user)
            );
        }

        return new FollowerOperationsRequest(
            deserializedAuthToken,
            deserializedUser
        );
    }
}

export class PostBlockRequest extends TweeterRequest {
    status: Status;
    followers: string[]; //List of alias of followers

    constructor(status: Status, followers: string[]) {
        super();
        this.status = status;
        this.followers = followers;
    }

    static fromJson(orginalPost: PostBlockRequest): PostBlockRequest {
        interface OrginalPostJson {
            status: Status;
            followers: string[];
        }
        const jsonObject: OrginalPostJson = orginalPost as unknown as OrginalPostJson;
        let deserializedStatus = Status.fromJson(JSON.stringify(jsonObject.status));
        if (deserializedStatus === null) {
            throw new Error(
                "OrginalPost, could not deserialize status with json:\n" +
                JSON.stringify(jsonObject.status)
            );
        }
        return new PostBlockRequest(
            deserializedStatus,
            jsonObject.followers
        );
    }
    static fromJsonString(originalPostJson: string): PostBlockRequest {
        interface OriginalPostObject {
            status: Status;
            followers: string[];
        }

        // Parse the JSON string into an object
        const jsonObject: OriginalPostObject = JSON.parse(originalPostJson);

        let deserializedStatus = Status.fromJson(JSON.stringify(jsonObject.status));
        if (deserializedStatus === null) {
            throw new Error(
                "OriginalPost, could not deserialize status with json:\n" +
                JSON.stringify(jsonObject.status)
            );
        }
        return new PostBlockRequest(
            deserializedStatus,
            jsonObject.followers
        );
    }
}