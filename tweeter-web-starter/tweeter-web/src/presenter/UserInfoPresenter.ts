import {AuthToken, User} from "tweeter-shared";
import {FollowService} from "../model/service/FollowService";
import {ToastView, Presenter, View} from "./Presenter";

export interface UserInfoView extends ToastView {
    infoChanged: () => void;
}

export class UserInfoPresenter extends Presenter {
    private service: FollowService;

    private _isFollower = false;
    private _followeesCount = -1;
    private _followersCount = -1;

    public constructor(view: UserInfoView) {
        super(view);
        this.service = new FollowService();
    }

    protected get view(): UserInfoView {
        return super.view as UserInfoView;
    }

    public get isFollower() {
        return this._isFollower;
    }

    public get followeesCount() {
        return this._followeesCount;
    }

    public get followersCount() {
        return this._followersCount;
    }

    public async updateUserInformation(authToken: AuthToken, currentUser: User, displayedUser: User) {
        await this.setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
        await this.setNumbFollowees(authToken!, displayedUser!);
        await this.setNumbFollowers(authToken!, displayedUser!);

        this.view.infoChanged();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        await this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this._isFollower = false;
            } else {
                this._isFollower = await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!);
            }
        }, 'determine follower status');
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        await this.doFailureReportingOperation(async () => {
            this._followeesCount = await this.service.getFolloweesCount(authToken, displayedUser);
        }, 'get followees count');
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        await this.doFailureReportingOperation(async () => {
            this._followersCount = await this.service.getFollowersCount(authToken, displayedUser);
        }, 'get followers count');
    };

    public async followDisplayedUser(authToken: AuthToken, displayedUser: User): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

            [this._followersCount, this._followeesCount] = await this.service.follow(
                authToken!,
                displayedUser!
            );

            this.view.clearLastInfoMessage();

            this._isFollower = true;
        }, 'follow user');

        this.view.infoChanged();
    };

    public async unfollowDisplayedUser(authToken: AuthToken, displayedUser: User): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage(
                `Removing ${displayedUser!.name} from followers...`,
                0
            );

            [this._followersCount, this._followeesCount] = await this.service.unfollow(
                authToken!,
                displayedUser!
            );

            this.view.clearLastInfoMessage();

            this._isFollower = false;
        }, 'unfollow user');

        this.view.infoChanged();
    };
}