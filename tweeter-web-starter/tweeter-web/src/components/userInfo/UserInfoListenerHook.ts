import {AuthToken, User} from "tweeter-shared";
import {useContext} from "react";
import {UserInfoContext} from "./UserInfoProvider";

interface UserInfo {
    setDisplayedUser: (user: User) => void;
    clearUserInfo: () => void;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    currentUser: User | null;
    displayedUser: User | null;
    authToken: AuthToken | null;
}

const useUserInfo = (): UserInfo => {
    const { setDisplayedUser, currentUser, authToken, displayedUser, clearUserInfo, updateUserInfo } =
        useContext(UserInfoContext);

    return {
        setDisplayedUser: setDisplayedUser,
        clearUserInfo: clearUserInfo,
        updateUserInfo: updateUserInfo,
        currentUser: currentUser,
        displayedUser: displayedUser,
        authToken: authToken
    }
}

export default useUserInfo;