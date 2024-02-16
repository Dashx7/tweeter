import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model_service/FollowService";

export interface REDOUserInfoView {
    displayErrorMessage: (message: string) => void,
    displayInfoMessage: (message: string, duration: number) => void,
    clearLastInfoMessage: () => void,
}

export class REDOUserInfoPresenter {
    private myView: REDOUserInfoView;
    private myService: FollowService = new FollowService();

    public FolloweesCount: number = -1;
    public FollowersCount: number = -1;
    public IsFollowerStatus: boolean = false;

    public constructor(view: REDOUserInfoView) {
        this.myView = view;
    }

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this.FolloweesCount = (await this.myService.getFolloweesCount(authToken, displayedUser));
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to get followees count because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this.FollowersCount = (await this.myService.getFollowersCount(authToken, displayedUser));
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to get followers count because of exception: ${error}`
            );
        }
    };

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        try {
            if (currentUser === displayedUser) {
                this.IsFollowerStatus = (false);
            } else {
                this.IsFollowerStatus = await this.myService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!);
            }
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        }
    };

    public async followDisplayedUser(
        displayedUser: User,
        authToken: AuthToken,

    ): Promise<void> {
        try {
            this.myView.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

            let [followersCount, followeesCount] = await this.follow(
                authToken!,
                displayedUser!
            );

            this.myView.clearLastInfoMessage();

            this.IsFollowerStatus = (true);
            this.FollowersCount = (followersCount);
            this.FolloweesCount = (followeesCount);
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to follow user because of exception: ${error}`
            );
        }
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the following message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        let followersCount = await this.myService.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.myService.getFolloweesCount(authToken, userToFollow);

        return [followersCount, followeesCount];
    };

    public async unfollowDisplayedUser(
        displayedUser: User,
        authToken: AuthToken
    ): Promise<void> {

        try {
            this.myView.displayInfoMessage(
                `Removing ${displayedUser!.name} from followers...`,
                0
            );

            let [followersCount, followeesCount] = await this.unfollow(
                authToken!,
                displayedUser!
            );

            this.myView.clearLastInfoMessage();

            this.IsFollowerStatus = (false);
            this.FollowersCount = (followersCount);
            this.FolloweesCount = (followeesCount);
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to unfollow user because of exception: ${error}`
            );
        }
    };

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        let followersCount = await this.myService.getFollowersCount(authToken, userToUnfollow);
        let followeesCount = await this.myService.getFolloweesCount(authToken, userToUnfollow);

        return [followersCount, followeesCount];
    };


}