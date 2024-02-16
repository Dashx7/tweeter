import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
    public constructor(view: AuthenticationView) {
        super(view);
    }

    public async doLogin(rememberMeRef: boolean, url: string | undefined) {
        try {
            let [user, authToken] = await this.Service.login(this.Alias, this.Password);

            this.view.updateUserInfo(user, user, authToken, rememberMeRef);

            if (url) {
                this.view.navigate(url);
            } else {
                this.view.navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    };

    public updateSubmitButtonStatus(): void {
        this.view.updateSubmitButtonStatus(!this.Alias || !this.Password);
    }

}