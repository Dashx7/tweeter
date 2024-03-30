import {AuthenticationPresenter, AuthenticationView} from "./AuthenticationPresenter";
import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";

export class LoginPresenter extends AuthenticationPresenter {
    public async doLogin(alias: string, password: string, originalUrl: string | undefined): Promise<void> {
        const opResult = await this.service.login(alias, password);

        await this.doAuthentication(async () => opResult, "log user in", originalUrl);
    };

    public checkSubmitButtonStatus = (alias: string, password: string): boolean => {
        return !alias || !password;
    };
}