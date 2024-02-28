import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
    public constructor(view: AuthenticationView) {
        super(view);
    }

    protected get view(): AuthenticationView {
        return this.view as AuthenticationView;
    }

    public async doLogin(rememberMeRef: boolean, url: string | undefined) {
        this.DoFailureReportingOperation(async () => {
            let [user, authToken] = await this.Service.login(this.Alias, this.Password);

            this.view.updateUserInfo(user, user, authToken, rememberMeRef);

            if (url) {
                this.view.navigate(url);
            } else {
                this.view.navigate("/");
            }
        }, "log user in");
    };

    public updateSubmitButtonStatus(): void {
        this.view.updateSubmitButtonStatus(!this.Alias || !this.Password);
    }

}