import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model_service/UserService";

export interface AuthenticationView {
    updateUserInfo: (user: User, displayedUser: User | null, authToken: AuthToken, rememberMe: boolean) => void;
    displayErrorMessage: (message: string) => void;
    navigate: (url: string) => void;
    updateSubmitButtonStatus: (value: boolean) => void;
}
export abstract class AuthenticationPresenter {
    private myView: AuthenticationView;
    private service: UserService = new UserService();

    private _alias: string = "";
    private _password: string = "";
    private rememberMe: boolean = false;


    protected constructor(view: AuthenticationView) {
        this.myView = view;
    }

    protected get view() {
        return this.myView;
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