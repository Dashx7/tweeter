import UseInfoHook from '../userInfo/UseInfoHook';
import useToastListener from "../toaster/ToastListenerHook";
import { useState } from 'react';
import { UserNavigationHookPresenter, UserNavigationView } from '../../presenter/UserNavigationPresenter';

export const userNavigationHook = () => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, authToken } = UseInfoHook();

    const listener: UserNavigationView = {
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser,
    }

    const [presenter] = useState(new UserNavigationHookPresenter(listener));


    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        await presenter.navigateToUser(event, authToken!);
    };
    return navigateToUser;
};

export default userNavigationHook;