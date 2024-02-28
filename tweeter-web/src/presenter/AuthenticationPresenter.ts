import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model_service/UserService";
import { BasicView, Presenter } from "./Presenter";

export interface AuthenticationView extends BasicView {
    updateUserInfo: (user: User, displayedUser: User | null, authToken: AuthToken, rememberMe: boolean) => void;
    navigate: (url: string) => void;
    updateSubmitButtonStatus: (value: boolean) => void;
}
export abstract class AuthenticationPresenter extends Presenter {
    private service: UserService = new UserService();

    private _alias: string = "";
    private _password: string = "";
    private rememberMe: boolean = false;


    protected constructor(view: AuthenticationView) {
        super(view);
    }

    public get Alias() {
        return this._alias;
    }
    public get Password() {
        return this._password;
    }
    public get RememberMe() {
        return this.rememberMe;
    }
    public get Service() {
        return this.service;
    }
    public set Alias(alias: string) {
        this._alias = alias;
        this.updateSubmitButtonStatus();
    }
    public set Password(password: string) {
        this._password = password;
        this.updateSubmitButtonStatus();
    }
    public set RememberMe(rememberMe: boolean) {
        this.rememberMe = rememberMe;
    }
    protected abstract updateSubmitButtonStatus(): void;
}