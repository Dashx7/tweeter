import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model_service/UserService";
import { BasicView, Presenter } from "./Presenter";

export interface AuthenticationView extends BasicView {
    updateUserInfo: (user: User, displayedUser: User | null, authToken: AuthToken) => void;
    navigate: (url: string) => void;
}
export class AuthenticationPresenter extends Presenter {
    private service: UserService = new UserService();

    protected constructor(view: AuthenticationView) {
        super(view);
    }

    protected get view(): AuthenticationView {
        return super.view as AuthenticationView;
    }

    public get Service() {
        return this.service;
    }

    protected async doAuthentication(operation: () => Promise<[User, AuthToken]>, description: string, url: undefined | string = undefined) {
        await this.DoFailureReportingOperation(async () => {
            let [user, authToken] = await operation();

            this.view.updateUserInfo(user, user, authToken);

            if (url) {
                this.view.navigate(url);
            } else {
                this.view.navigate("/");
            }
        }, "log user in");
    }

    // abstract checkSubmitButtonStatus(): boolean;
}