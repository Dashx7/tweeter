import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";
import {Presenter, ToastView, View} from "./Presenter";

export interface NavbarView extends ToastView {
    clearUserInfo: () => void;
}

export class NavbarPresenter extends Presenter {
    private _service: UserService | null = null;

    public constructor(view: NavbarView) {
        super(view);
    }

    protected get view(): NavbarView {
        return super.view as NavbarView;
    }

    public get service() {
        if (this._service == null) {
            this._service = new UserService();
        }

        return this._service;
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);

        await this.doFailureReportingOperation(async () => {
            await this.service.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, 'log user out');
    };
}