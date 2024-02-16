import { AuthToken } from "tweeter-shared";
import useToastListener from "../components/toaster/ToastListenerHook";
import UseInfoHook from "../components/userInfo/UseInfoHook";
import { UserService } from "../model_service/UserService";

export interface AppNavbarView {
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;
}

export class AppNavbarPresenter {
    public myView: AppNavbarView;
    private service: UserService = new UserService();

    public constructor(view: AppNavbarView) {
        this.myView = view;
    }

    public async logOut(authToken: AuthToken): Promise<void> {
        this.myView.displayInfoMessage("Logging Out...", 0);

        try {
            await this.logout(authToken);

            this.myView.clearLastInfoMessage();
            this.myView.clearUserInfo();
        } catch (error) {
            this.myView.displayErrorMessage(`Failed to log user out because of exception: ${error}`);
        }
    }

    private async logout(authToken: AuthToken): Promise<void> {
        await this.service.logout(authToken);
    }
}