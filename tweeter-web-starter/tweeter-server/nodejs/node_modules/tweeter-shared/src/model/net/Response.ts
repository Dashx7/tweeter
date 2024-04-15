import {AuthToken} from "../domain/AuthToken";
import {User} from "../domain/User";
import {Status} from "../domain/Status";

export class TweeterResponse {
    private _success: boolean;
    private _message: string | null;

    constructor(success: boolean, message: string | null = null) {
        this._success = success;
        this._message = message;
    }

    get success() {
        return this._success;
    }

    get message() {
        return this._message;
    }
}

interface ResponseJson {
    _success: boolean;
    _message: string;
}

export class VoidResponse extends TweeterResponse {
    static fromJson(json: JSON): VoidResponse {
        const jsonObject: ResponseJson =
            json as unknown as ResponseJson;

        return new VoidResponse(
            jsonObject._success,
            jsonObject._message
        );
    }
}

export class AuthenticateResponse extends TweeterResponse {
    private _user: User;
    private _token: AuthToken;

    constructor(
        success: boolean,
        user: User,
        token: AuthToken,
        message: string | null = null
    ) {
        super(success, message);
        this._user = user;
        this._token = token;
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    static fromJson(json: JSON): AuthenticateResponse {
        interface AuthenticateResponseJson extends ResponseJson {
            _user: JSON;
            _token: JSON;
        }

        const jsonObject: AuthenticateResponseJson =
            json as unknown as AuthenticateResponseJson;
        const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

        if (deserializedUser === null) {
            throw new Error(
                "AuthenticateResponse, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject._user)
            );
        }

        const deserializedToken = AuthToken.fromJson(
            JSON.stringify(jsonObject._token)
        );

        if (deserializedToken === null) {
            throw new Error(
                "AuthenticateResponse, could not deserialize token with json:\n" +
                JSON.stringify(jsonObject._token)
            );
        }

        return new AuthenticateResponse(
            jsonObject._success,
            deserializedUser,
            deserializedToken,
            jsonObject._message
        );
    }
}

export class GetUserResponse extends TweeterResponse {
    private _user: User | null;

    constructor(
        success: boolean,
        user: User | null,
        message: string | null = null
    ) {
        super(success, message);
        this._user = user;
    }

    get user() {
        return this._user;
    }

    static fromJson(json: JSON): GetUserResponse {
        interface GetUserResponseJson extends ResponseJson {
            _user: JSON;
        }

        const jsonObject: GetUserResponseJson =
            json as unknown as GetUserResponseJson;
        const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

        if (deserializedUser === null) {
            throw new Error(
                "GetUserResponse, could not deserialize user with json:\n" +
                JSON.stringify(jsonObject._user)
            );
        }

        return new GetUserResponse(
            jsonObject._success,
            deserializedUser,
            jsonObject._message
        );
    }
}

export class LoadMoreStatusItemsResponse extends TweeterResponse {
    private _newItems: Status[];
    private _hasMore: boolean;

    constructor(
        success: boolean,
        newItems: Status[],
        hasMore: boolean,
        message: string | null = null
    ) {
        super(success, message);
        this._newItems = newItems;
        this._hasMore = hasMore;
    }

    public get newItems() {
        return this._newItems;
    }

    public get hasMore() {
        return this._hasMore;
    }

    static fromJson(json: JSON): LoadMoreStatusItemsResponse {
        interface LoadMoreStatusItemsResponseJson extends ResponseJson {
            _newItems: Status[];
            _hasMore: boolean;
        }

        const jsonObject: LoadMoreStatusItemsResponseJson =
            json as unknown as LoadMoreStatusItemsResponseJson;

        let deserializedNewItems = Status.fromJsonAsList(JSON.stringify(jsonObject._newItems));

        if (deserializedNewItems === null) {
            throw new Error(
                "LoadMoreStatusItemsResponse, could not deserialize newItems with json:\n" +
                JSON.stringify(jsonObject._newItems)
            );
        }

        return new LoadMoreStatusItemsResponse(
            jsonObject._success,
            deserializedNewItems,
            jsonObject._hasMore,
            jsonObject._message
        );
    }
}

export class LoadMoreUserItemsResponse extends TweeterResponse {
    private _newItems: User[];
    private _hasMore: boolean;

    constructor(
        success: boolean,
        newItems: User[],
        hasMore: boolean,
        message: string | null = null
    ) {
        super(success, message);
        this._newItems = newItems;
        this._hasMore = hasMore;
    }

    public get newItems() {
        return this._newItems;
    }

    public get hasMore() {
        return this._hasMore;
    }

    static fromJson(json: JSON): LoadMoreUserItemsResponse {
        interface LoadMoreUserItemsResponseJson extends ResponseJson {
            _newItems: User[];
            _hasMore: boolean;
        }

        const jsonObject: LoadMoreUserItemsResponseJson =
            json as unknown as LoadMoreUserItemsResponseJson;

        let deserializedNewItems = User.fromJsonAsList(JSON.stringify(jsonObject._newItems));

        if (deserializedNewItems === null) {
            throw new Error(
                "LoadMoreUserItemsResponse, could not deserialize newItems with json:\n" +
                JSON.stringify(jsonObject._newItems)
            );
        }

        return new LoadMoreUserItemsResponse(
            jsonObject._success,
            deserializedNewItems,
            jsonObject._hasMore,
            jsonObject._message
        );
    }
}

export class GetIsFollowerResponse extends TweeterResponse {
    private _isFollower: boolean;

    constructor(
        success: boolean,
        isFollower: boolean,
        message: string | null = null
    ) {
        super(success, message);
        this._isFollower = isFollower;
    }

    public get isFollower() {
        return this._isFollower;
    }

    static fromJson(json: JSON): GetIsFollowerResponse {
        interface GetIsFollowerResponseJson extends ResponseJson {
            _isFollower: boolean;
        }

        const jsonObject: GetIsFollowerResponseJson =
            json as unknown as GetIsFollowerResponseJson;

        return new GetIsFollowerResponse(
            jsonObject._success,
            jsonObject._isFollower,
            jsonObject._message
        );
    }
}

export class GetFollowCountResponse extends TweeterResponse {
    private _followCount: number;

    constructor(
        success: boolean,
        followCount: number,
        message: string | null = null
    ) {
        super(success, message);
        this._followCount = followCount;
    }

    public get followCount() {
        return this._followCount;
    }

    static fromJson(json: JSON): GetFollowCountResponse {
        interface GetFollowCountResponseJson extends ResponseJson {
            _followCount: number;
        }

        const jsonObject: GetFollowCountResponseJson =
            json as unknown as GetFollowCountResponseJson;

        return new GetFollowCountResponse(
            jsonObject._success,
            jsonObject._followCount,
            jsonObject._message
        );
    }
}

export class FollowActionResponse extends TweeterResponse {
    private _followersCount: number;
    private _followingCount: number;

    constructor(
        success: boolean,
        followersCount: number,
        followingCount: number,
        message: string | null = null
    ) {
        super(success, message);
        this._followersCount = followersCount;
        this._followingCount = followingCount;
    }

    public get followersCount() {
        return this._followersCount;
    }

    public get followingCount() {
        return this._followingCount;
    }

    static fromJson(json: JSON): FollowActionResponse {
        interface FollowActionResponseJson extends ResponseJson {
            _followersCount: number;
            _followingCount: number;
        }

        const jsonObject: FollowActionResponseJson =
            json as unknown as FollowActionResponseJson;

        return new FollowActionResponse(
            jsonObject._success,
            jsonObject._followersCount,
            jsonObject._followingCount,
            jsonObject._message
        );
    }
}