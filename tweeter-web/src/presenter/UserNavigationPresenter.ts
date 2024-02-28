import { AuthToken, User } from 'tweeter-shared';
import { UserService } from '../model_service/UserService';
import { BasicView, Presenter } from './Presenter';

export interface UserNavigationView extends BasicView {
    displayErrorMessage: (message: string) => void,
    setDisplayedUser: (user: User) => void,
}

export class UserNavigationHookPresenter extends Presenter {
    private service: UserService = new UserService();

    constructor(userNavigationView: UserNavigationView) {
        super(userNavigationView);
    }

    protected get view(): UserNavigationView {
        return this.view as UserNavigationView;
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
                this.view.setDisplayedUser(user);
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to navigate to user because of exception: ${error}`);
        }
    }
}