import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model_service/FollowService";

export interface UserInfoView {
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
    infoChanged: () => void;
}

export class UserInfoPresenter {
    private view: UserInfoView;
    private service: FollowService;

    private _isFollower = false;
    private _followeesCount = -1;
    private _followersCount = -1;

    public constructor(view: UserInfoView) {
        this.view = view;
        this.service = new FollowService();
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
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        try {
            if (currentUser === displayedUser) {
                this._isFollower = false;
            } else {
                this._isFollower = await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!);
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        } finally {
            this.view.infoChanged();
        }
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this._followeesCount = await this.service.getFolloweesCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followees count because of exception: ${error}`
            );
        } finally {
            this.view.infoChanged();
        }
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ) {
        try {
            this._followersCount = await this.service.getFollowersCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followers count because of exception: ${error}`
            );
        } finally {
            this.view.infoChanged();
        }
    };

    public async followDisplayedUser(authToken: AuthToken, displayedUser: User): Promise<void> {
        try {
            this.view.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

            [this._followersCount, this._followeesCount] = await this.service.follow(
                authToken!,
                displayedUser!
            );

            this.view.clearLastInfoMessage();

            this._isFollower = true;
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to follow user because of exception: ${error}`
            );
        } finally {
            this.view.infoChanged();
        }
    };

    public async unfollowDisplayedUser(authToken: AuthToken, displayedUser: User): Promise<void> {
        try {
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
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to unfollow user because of exception: ${error}`
            );
        } finally {
            this.view.infoChanged();
        }
    };
}




// import { AuthToken, User } from "tweeter-shared";
// import { FollowService } from "../model_service/FollowService";

// export interface UserInfoView {
//     displayErrorMessage: (message: string) => void,
//     displayInfoMessage: (message: string, duration: number) => void,
//     clearLastInfoMessage: () => void,
// }

// //Current issues:
// // The following numbers are being weirdly updated and in weird order
// // User navigation hook presenter remake? What am I doing in that

// export class UserInfoPresenter {
//     private myView: UserInfoView;
//     private myService: FollowService = new FollowService();

//     public FolloweesCount: number = -1;
//     public FollowersCount: number = -1;
//     public IsFollowerStatus: boolean = false;
//     // Have a displayed user?

//     public constructor(view: UserInfoView) {
//         this.myView = view;
//     }

//     public async setNumbFollowees(
//         authToken: AuthToken,
//         displayedUser: User
//     ) {
//         try {
//             this.FolloweesCount = (await this.myService.getFolloweesCount(authToken, displayedUser));
//             console.log("setNumbFollowees FolloweesCount: ", this.FolloweesCount);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to get followees count because of exception: ${error}`
//             );
//         }
//     };

//     public async setNumbFollowers(
//         authToken: AuthToken,
//         displayedUser: User
//     ) {
//         try {
//             this.FollowersCount = (await this.myService.getFollowersCount(authToken, displayedUser));
//             console.log("setNumbFollowers FollowersCount: ", this.FollowersCount);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to get followers count because of exception: ${error}`
//             );
//         }
//     };

//     public async setIsFollowerStatus(
//         authToken: AuthToken,
//         currentUser: User,
//         displayedUser: User
//     ) {
//         try {
//             if (currentUser === displayedUser) {
//                 this.IsFollowerStatus = (false);
//             } else {
//                 this.IsFollowerStatus = await this.myService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!);
//             }
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to determine follower status because of exception: ${error}`
//             );
//         }
//     };

//     public async followDisplayedUser(
//         displayedUser: User,
//         authToken: AuthToken,

//     ): Promise<void> {
//         try {
//             console.log("followDisplayedUser curentUser: ", displayedUser);
//             this.myView.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);
//             console.log("1")
//             let [followersCountTemp, followeesCountTemp] = await this.follow(
//                 authToken!,
//                 displayedUser!
//             );
//             console.log("2")
//             this.myView.clearLastInfoMessage();

//             console.log("Now setting isFollowerStatus to true and updating counts")
//             this.IsFollowerStatus = (true);
//             this.FollowersCount = (followersCountTemp);
//             this.FolloweesCount = (followeesCountTemp);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to follow user because of exception: ${error}`
//             );
//         }
//     };

//     public async follow(
//         authToken: AuthToken,
//         userToFollow: User
//     ): Promise<[number, number]> {
//         // Pause so we can see the following message. Remove when connected to the server
//         console.log("1.1")
//         await new Promise((f) => setTimeout(f, 2000));
//         console.log("1.2")
//         // TODO: Call the server
//         let followersCountTemp = await this.myService.getFollowersCount(authToken, userToFollow);
//         let followeesCountTemp = await this.myService.getFolloweesCount(authToken, userToFollow);
//         return [followersCountTemp, followeesCountTemp];
//     };

//     public async unfollowDisplayedUser(
//         displayedUser: User,
//         authToken: AuthToken
//     ): Promise<void> {
//         try {
//             console.log("followDisplayedUser curentUser: ", displayedUser);
//             this.myView.displayInfoMessage(
//                 `Removing ${displayedUser!.name} from followers...`,
//                 0
//             );
//             console.log("1")
//             let [followersCountTemp, followeesCountTemp] = await this.unfollow(
//                 authToken!,
//                 displayedUser!
//             );
//             console.log("2")
//             this.myView.clearLastInfoMessage();

//             console.log("Now setting isFollowerStatus to false and updating counts")
//             this.IsFollowerStatus = (false);
//             this.FollowersCount = (followersCountTemp);
//             this.FolloweesCount = (followeesCountTemp);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to unfollow user because of exception: ${error}`
//             );
//         }
//     };

//     public async unfollow(
//         authToken: AuthToken,
//         userToUnfollow: User
//     ): Promise<[number, number]> {
//         console.log("1.1")
//         // Pause so we can see the unfollowing message. Remove when connected to the server
//         await new Promise((f) => setTimeout(f, 2000));
//         console.log("1.2")
//         // TODO: Call the server

//         let followersCountTemp = await this.myService.getFollowersCount(authToken, userToUnfollow);
//         let followeesCountTemp = await this.myService.getFolloweesCount(authToken, userToUnfollow);
//         return [followersCountTemp, followeesCountTemp];
//     };


// }







// import { AuthToken, User } from 'tweeter-shared';
// import { FollowService } from '../model_service/FollowService';

// export interface UserInfoView {
//     displayErrorMessage: (message: string) => void;
//     displayInfoMessage: (message: string, duration: number) => void;
//     clearLastInfoMessage: () => void;
// }

// export class UserInfoPresenter {
//     private myView: UserInfoView;
//     private service: FollowService;

//     private _isFollower: boolean = false;
//     private _followerCount: number = -1;
//     private _followeeCount: number = -1;

//     public constructor(view: UserInfoView) {
//         this.myView = view;
//         this.service = new FollowService();
//     }

//     public async setIsFollowerStatus(
//         authToken: AuthToken,
//         currentUser: User,
//         displayedUser: User
//     ) {
//         try {
//             if (currentUser === displayedUser) {
//                 this._isFollower = false;
//             } else {
//                 this._isFollower = await this.service.getIsFollowerStatus(authToken, currentUser, displayedUser);
//             }
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to determine follower status because of exception: ${error}`
//             );
//         }
//     };

//     public async setNumbFollowees(
//         authToken: AuthToken,
//         displayedUser: User
//     ) {
//         try {
//             this._followeeCount = await this.service.getFolloweesCount(authToken, displayedUser);
//             console.log("setNumbFollowees FolloweesCount: ", this._followeeCount);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to get followees count because of exception: ${error}`
//             );
//         }
//     };

//     public setNumbFollowers = async (
//         authToken: AuthToken,
//         displayedUser: User
//     ) => {
//         try {
//             this.FollowerCount = await this.service.getFollowersCount(authToken, displayedUser);
//             console.log("setNumbFollowers FollowersCount: ", this.FollowerCount);
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to get followers count because of exception: ${error}`
//             );
//         }
//     };

//     public async follow(
//         authToken: AuthToken,
//         userToFollow: User
//     ): Promise<[followersCount: number, followeesCount: number]> {
//         // Pause so we can see the following message. Remove when connected to the server
//         await new Promise((f) => setTimeout(f, 2000));

//         // TODO: Call the server
//         let followersCount = await this.service.getFollowersCount(authToken, userToFollow);
//         let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow);
//         return [followersCount, followeesCount];
//     };

//     public async unfollow(
//         authToken: AuthToken,
//         userToUnfollow: User
//     ): Promise<[followersCount: number, followeesCount: number]> {
//         // Pause so we can see the unfollowing message. Remove when connected to the server
//         await new Promise((f) => setTimeout(f, 2000));

//         // TODO: Call the server

//         let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow);
//         let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow);
//         return [followersCount, followeesCount];
//     };

//     public async followDisplayedUser(
//         authToken: AuthToken,
//         displayedUser: User
//     ): Promise<void> {
//         try {
//             this.myView.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

//             let [FollowerCountTemp, FolloweeCountTemp] = await this.follow(
//                 authToken!,
//                 displayedUser!
//             );

//             this.myView.clearLastInfoMessage();

//             this._isFollower = true;
//             this._followerCount = FollowerCountTemp;
//             this._followeeCount = FolloweeCountTemp;
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to follow user because of exception: ${error}`
//             );
//         }
//     };

//     public async unfollowDisplayedUser(
//         authToken: AuthToken,
//         displayedUser: User
//     ): Promise<void> {
//         try {
//             this.myView.displayInfoMessage(
//                 `Removing ${displayedUser!.name} from followers...`,
//                 0
//             );

//             let [FollowCountTemp, FolloweeCountTemp] = await this.unfollow(
//                 authToken!,
//                 displayedUser!
//             );

//             this.myView.clearLastInfoMessage();

//             this._isFollower = false;
//             this._followerCount = FollowCountTemp;
//             this._followeeCount = FolloweeCountTemp;
//         } catch (error) {
//             this.myView.displayErrorMessage(
//                 `Failed to unfollow user because of exception: ${error}`
//             );
//         }
//     };

//     public get IsFollower(): boolean {
//         return this._isFollower;
//     }
//     public get FolloweeCount(): number {
//         return this._followeeCount;
//     }
//     public get FollowerCount(): number {
//         return this._followerCount;
//     }
//     public set IsFollower(value: boolean) {
//         this._isFollower = value;
//     }
//     public set FolloweeCount(value: number) {
//         this._followeeCount = value;
//     }
//     public set FollowerCount(value: number) {
//         this._followerCount = value;
//     }
// }
