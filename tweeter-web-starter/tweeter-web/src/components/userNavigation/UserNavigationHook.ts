import React, {useState} from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoListenerHook";
import {UserNavigationPresenter, UserNavigationView} from "../../presenter/UserNavigationPresenter";

interface UserNavigation {
    navigateToUser: (event: React.MouseEvent) => Promise<void>
}

const useUserNavigation = (): UserNavigation => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } =
        useUserInfo();

    const listener: UserNavigationView = {
        setDisplayedUser: setDisplayedUser,
        displayErrorMessage: displayErrorMessage
    }

    const [presenter] = useState(new UserNavigationPresenter(listener));

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();

        await presenter.navigateToUser(event.target.toString(), authToken!, currentUser!);
    };

    return {
        navigateToUser: navigateToUser
    }
}

export default useUserNavigation;