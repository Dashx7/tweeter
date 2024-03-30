import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {UserService} from "../model/service/UserService";

export interface AuthenticationView extends View {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken) => void;
    navigate: (to: string) => void;
}

export abstract class AuthenticationPresenter extends Presenter {
    private readonly _service: UserService;

    public constructor(view: AuthenticationView) {
        super(view);
        this._service = new UserService();
    }

    public get view(): AuthenticationView {
        return super.view as AuthenticationView;
    }

    protected get service() {
        return this._service;
    }

    protected async doAuthentication(operation: () => Promise<[User, AuthToken]>, operationDescription: string, originalUrl: string | undefined = undefined): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            let [user, authToken] = await operation();
            
            this.view.updateUserInfo(user, user, authToken);
            if (!!originalUrl) {
                this.view.navigate(originalUrl);
            } else {
                this.view.navigate("/");
            }
        }, operationDescription);
    }
}