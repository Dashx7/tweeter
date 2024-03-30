import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter {
    public constructor(view: AuthenticationView) {
        super(view);
    }

    public async doLogin(url: string | undefined, Alias: string, Password: string) {
        this.doAuthentication(() => this.Service.login(Alias, Password), "log user in", url);
        // console.log("LoginPresenter.doLogin");
    };

    public checkSubmitButtonStatus(alias: string, password: string): boolean {
        return !alias || !password;
    };

}