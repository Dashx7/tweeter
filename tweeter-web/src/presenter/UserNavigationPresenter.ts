import { AuthToken, User } from 'tweeter-shared';
import { UserService } from '../model_service/UserService';

export interface UserNavigationView {
    displayErrorMessage: (message: string) => void,
    setDisplayedUser: (user: User) => void,
}

export class UserNavigationHookPresenter {
    private myView: UserNavigationView;
    private service: UserService = new UserService();

    constructor(userNavigationView: UserNavigationView) {
        this.myView = userNavigationView;
    }

    public async navigateToUser(event: React.MouseEvent, authToken: AuthToken): Promise<void> {
        const extractAlias = (value: string): string => {
            let index = value.indexOf("@");
            return value.substring(index);
        };

        try {
            let alias = extractAlias(event.target.toString());

            let user = await this.service.getUser(authToken!, alias);

            if (!!user) {
                this.myView.setDisplayedUser(user);
            }
        } catch (error) {
            this.myView.displayErrorMessage(`Failed to navigate to user because of exception: ${error}`);
        }
    }

    // public getmyUserNavigationView(): UserNavigationView {
    //     return this.myView;
    // }

}