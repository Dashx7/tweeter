// import { AuthToken, Status, User } from "tweeter-shared";

import { AuthToken } from "../domain/AuthToken";
import { Status } from "../domain/Status";
import { User } from "../domain/User";

export abstract class TweeterRequest { }

export class LoadMoreFollowXRequest extends TweeterRequest {
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

    static fromJson(json: any): LoadMoreFollowXRequest {
        console.log('LoadMoreFollowXRequest called in Request.ts with json: ', json);
        interface LoadMoreFollowXRequestJson {
            authToken: AuthToken;
            user: User;
            pageSize: number;
            lastItem: User | null;
        }

        const jsonObject: LoadMoreFollowXRequestJson =
            json as unknown as LoadMoreFollowXRequestJson;

        return new LoadMoreFollowXRequest(
            jsonObject.authToken,
            jsonObject.user,
            jsonObject.pageSize,
            jsonObject.lastItem
        );
    }
}

export class GetFollowXCountRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User) {
        super();
        this.authToken = authToken;
        this.user = user;
    }

    static fromJson(json: any): GetFollowXCountRequest {
        console.log('GetFollowXCountRequest called in Request.ts with json: ', json);
        interface GetFollowXCountRequestJson {
            authToken: AuthToken;
            user: User;
        }

        const jsonObject: GetFollowXCountRequestJson =
            json as unknown as GetFollowXCountRequestJson;

        return new GetFollowXCountRequest(
            jsonObject.authToken,
            jsonObject.user
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

    static fromJson(json: any): GetUserRequest {
        console.log('GetUserRequest called in Request.ts with json: ', json);
        interface GetUserRequestJson {
            authToken: AuthToken;
            alias: string;
        }

        const jsonObject: GetUserRequestJson =
            json as unknown as GetUserRequestJson;

        return new GetUserRequest(
            jsonObject.authToken,
            jsonObject.alias
        );
    }
}

export class XFollowRequest extends TweeterRequest {
    authToken: AuthToken;
    userToXFollow: User;

    constructor(authToken: AuthToken, userToFollow: User) {
        super();
        this.authToken = authToken;
        this.userToXFollow = userToFollow;
    }
    static fromJson(json: any): XFollowRequest {
        console.log('Follow called in Request.ts with json: ', json);

        // Define the type of the JSON object
        interface XFollowRequestJson {
            authToken: AuthToken;
            userToXFollow: User;
        }

        // Cast the JSON object to the XFollowRequestJson type
        const jsonObject = json as unknown as XFollowRequestJson;

        // Create a new XFollowRequest from the JSON object
        return new XFollowRequest(
            jsonObject.authToken,
            jsonObject.userToXFollow
        );
    }
}

export class LoginRequest extends TweeterRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }

    static fromJson(json: any): LoginRequest {
        console.log('LoginRequest called in Request.ts with json: ', json);
        interface LoginRequestJson {
            username: string;
            password: string;
        }

        const jsonObject: LoginRequestJson =
            json as unknown as LoginRequestJson;

        return new LoginRequest(
            jsonObject.username,
            jsonObject.password
        );
    }
}

export class LogoutRequest extends TweeterRequest {
    authToken: AuthToken;

    constructor(authToken: AuthToken) {
        super();
        this.authToken = authToken;
    }

    static fromJson(json: any): LogoutRequest {
        console.log('LogoutRequest called in Request.ts with json: ', json);
        interface LogoutRequestJson {
            authToken: AuthToken;
        }

        const jsonObject: LogoutRequestJson =
            json as unknown as LogoutRequestJson;

        return new LogoutRequest(
            jsonObject.authToken
        );
    }
}

export class RegisterRequest extends TweeterRequest {
    firstName: string;
    lastName: string;
    alias: string;
    password: string;
    userImageBytes: Uint8Array;

    constructor(firstName: string, lastName: string, alias: string, password: string, userImageBytes: Uint8Array) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.alias = alias;
        this.password = password;
        this.userImageBytes = userImageBytes;
    }

    static fromJson(json: any): RegisterRequest {
        console.log('RegisterRequest called in Request.ts with json: ', json);
        interface RegisterRequestJson {
            firstName: string;
            lastName: string;
            alias: string;
            password: string;
            userImageBytes: Uint8Array;
        }

        const jsonObject: RegisterRequestJson =
            json as unknown as RegisterRequestJson;

        return new RegisterRequest(
            jsonObject.firstName,
            jsonObject.lastName,
            jsonObject.alias,
            jsonObject.password,
            jsonObject.userImageBytes
        );
    }
}

export class LoadMoreXItemsRequest extends TweeterRequest {
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

    static fromJson(json: any): LoadMoreXItemsRequest {
        console.log('LoadMoreXItemsRequest called in Request.ts with json: ', json);
        interface LoadMoreXItemsRequestJson {
            authToken: AuthToken;
            user: User;
            pageSize: number;
            lastItem: Status | null;
        }

        const jsonObject: LoadMoreXItemsRequestJson =
            json as unknown as LoadMoreXItemsRequestJson;

        return new LoadMoreXItemsRequest(
            jsonObject.authToken,
            jsonObject.user,
            jsonObject.pageSize,
            jsonObject.lastItem
        );
    }
}

export class PostStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    status: Status;

    constructor(authToken: AuthToken, status: Status) {
        super();
        this.authToken = authToken;
        this.status = status;
    }

    static fromJson(json: any): PostStatusRequest {
        console.log('PostStatusRequest called in Request.ts with json: ', json);
        interface PostStatusRequestJson {
            authToken: AuthToken;
            status: Status;
        }

        const jsonObject: PostStatusRequestJson =
            json as unknown as PostStatusRequestJson;

        return new PostStatusRequest(
            jsonObject.authToken,
            jsonObject.status
        );
    }
}

export class GetIsFollowerStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    selectedUser: User;

    constructor(authToken: AuthToken, user: User, selectedUser: User) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.selectedUser = selectedUser;
    }

    static fromJson(json: any): GetIsFollowerStatusRequest {
        console.log('GetIsFollowerStatusRequest called in Request.ts with json: ', json);
        interface GetIsFollowerStatusRequestJson {
            authToken: AuthToken;
            user: User;
            selectedUser: User;
        }

        const jsonObject: GetIsFollowerStatusRequestJson =
            json as unknown as GetIsFollowerStatusRequestJson;

        return new GetIsFollowerStatusRequest(
            jsonObject.authToken,
            jsonObject.user,
            jsonObject.selectedUser
        );
    }
}
