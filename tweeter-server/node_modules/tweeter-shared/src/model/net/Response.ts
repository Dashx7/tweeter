import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { Status } from "tweeter-shared/src/model/domain/Status";
import { User } from "tweeter-shared/src/model/domain/User";

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

export class LoadMoreXItemsResponse extends TweeterResponse {
    private _newItems: Status[];
    private _hasMorePages: boolean;

    constructor(
        success: boolean,
        status: Status[],
        hasMorePages: boolean,
        message: string | null = null
    ) {
        super(success, message);
        this._newItems = status;
        this._hasMorePages = hasMorePages;
    }

    public get newItems() {
        return this._newItems;
    }

    public get hasMorePages() {
        return this._hasMorePages;
    }

    static fromJson(json: JSON): LoadMoreXItemsResponse {
        interface LoadMoreXItemsResponseJson extends ResponseJson {
            _status: Status[];
            _hasMorePages: boolean;
        }

        const jsonObject: LoadMoreXItemsResponseJson =
            json as unknown as LoadMoreXItemsResponseJson;

        const deserializedStatuses = Status.fromJsonArray(JSON.stringify(jsonObject._status)); //

        if (deserializedStatuses === null) {
            throw new Error(
                "LoadMoreXItemsResponse, could not deserialize statuses with json:\n" +
                JSON.stringify(jsonObject._status)
            );
        }

        return new LoadMoreXItemsResponse(
            jsonObject._success,
            deserializedStatuses,
            jsonObject._hasMorePages,
            jsonObject._message
        );
    }

}

export class LoadMoreFollowXResponse extends TweeterResponse {
    _Users: User[];
    _hasMoreFollowX: boolean;

    constructor(success: boolean, users: User[], hasMoreFollowX: boolean, message: string | null = null) {
        super(success, message);
        this._Users = users;
        this._hasMoreFollowX = hasMoreFollowX;
    }

    get Users() {
        return this._Users;
    }

    get hasMoreFollowX() {
        return this._hasMoreFollowX;
    }

    static fromJson(json: JSON): LoadMoreFollowXResponse {
        interface LoadMoreFollowXResponseJson extends ResponseJson {
            _Users: JSON[];
            _hasMoreFollowX: boolean;
        }

        const jsonObject: LoadMoreFollowXResponseJson =
            json as unknown as LoadMoreFollowXResponseJson;
        const deserializedUsers = User.fromJsonArray(JSON.stringify(jsonObject._Users));

        if (deserializedUsers === null) {
            throw new Error(
                "LoadMoreFollowXResponse, could not deserialize users with json:\n" +
                JSON.stringify(jsonObject._Users)
            );
        }

        return new LoadMoreFollowXResponse(
            jsonObject._success,
            deserializedUsers,
            jsonObject._hasMoreFollowX,
            jsonObject._message
        );
    }
}
//Post status and logout responses
export class VoidResponse extends TweeterResponse {
    constructor(success: boolean, message: string | null = null) {
        super(success, message);
    }

    static fromJson(json: JSON): VoidResponse {
        interface VoidResponseJson extends ResponseJson { }

        const jsonObject: VoidResponseJson =
            json as unknown as VoidResponseJson;

        return new VoidResponse(
            jsonObject._success,
            jsonObject._message
        );
    }
}

export class GetUserResponse extends TweeterResponse {
    private _user: User | null;
    constructor(success: boolean, message: string | null = null, user: User | null = null) {
        super(success, message);
        this._user = null;
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
            jsonObject._message,
            deserializedUser
        );
    }
}

export class XFollowResponse extends TweeterResponse {
    private _followers: number;
    private _followees: number;

    constructor(success: boolean, message: string | null = null, followers: number, followees: number) {
        super(success, message);
        this._followers = followers;
        this._followees = followees;
    }

    get followers() {
        return this._followers;
    }

    get followees() {
        return this._followees;
    }

    static fromJson(json: JSON): XFollowResponse {
        interface XFollowResponseJson extends ResponseJson {
            _followers: number;
            _followees: number;
        }

        const jsonObject: XFollowResponseJson =
            json as unknown as XFollowResponseJson;

        return new XFollowResponse(
            jsonObject._success,
            jsonObject._message,
            jsonObject._followers,
            jsonObject._followees
        );
    }
}

export class GetFollowXCountResponse extends TweeterResponse {
    private count: number;

    constructor(count: number) {
        super(true);
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    static fromJson(json: JSON): GetFollowXCountResponse {
        interface GetFollowXCountResponseJson {
            count: number;
        }

        const jsonObject: GetFollowXCountResponseJson =
            json as unknown as GetFollowXCountResponseJson;

        return new GetFollowXCountResponse(
            jsonObject.count
        );
    }
}