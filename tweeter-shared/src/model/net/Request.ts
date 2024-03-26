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
}

export class GetFollowXCountRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User) {
        super();
        this.authToken = authToken;
        this.user = user;
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
}

export class XFollowRequest extends TweeterRequest {
    authToken: AuthToken;
    userToFollow: User;

    constructor(authToken: AuthToken, userToFollow: User) {
        super();
        this.authToken = authToken;
        this.userToFollow = userToFollow;
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

}

export class PostStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    status: Status;

    constructor(authToken: AuthToken, status: Status) {
        super();
        this.authToken = authToken;
        this.status = status;
    }
}

