import { AuthToken } from "tweeter-shared";
import { UserService } from "../model_service/UserService";
import { BasicView, MessageView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageView {
    clearUserInfo: () => void;
}

export class AppNavbarPresenter extends Presenter {
    private service: UserService = new UserService();

    public constructor(view: AppNavbarView) {
        super(view);
    }

    protected get view(): AppNavbarView {
        return super.view as AppNavbarView;
    }

    public async logOut(authToken: AuthToken): Promise<void> {
        this.view.displayErrorMessage("Logging Out...");
        this.DoFailureReportingOperation(async () => {
            await this.logout(authToken);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        }, "log user out");
    }

    private async logout(authToken: AuthToken): Promise<void> {
        await this.service.logout(authToken);
    }
}