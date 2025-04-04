import {AuthToken, User} from "tweeter-shared";
import {UserService} from "../model/service/UserService";
import {Presenter, View} from "./Presenter";

export interface UserNavigationView extends View {
    setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter {
    private service: UserService;

    public constructor(view: UserNavigationView) {
        super(view);
        this.service = new UserService();
    }

    protected get view(): UserNavigationView {
        return super.view as UserNavigationView;
    }

    private extractAlias(value: string): string {
        let index = value.indexOf("@");
        return value.substring(index);
    };

    public async navigateToUser(userHandle: string, authToken: AuthToken, currentUser: User): Promise<void> {
        await this.doFailureReportingOperation(async () => {
            let alias = this.extractAlias(userHandle);

            let user = await this.service.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        }, 'get user');
    }
}