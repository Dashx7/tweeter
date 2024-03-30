import { useContext } from 'react';
import { UserInfoContext } from './UserInfoProvider';


export const UseInfoHook = () => {
    const context = useContext(UserInfoContext);

    if (context === undefined) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    } //Probably not necessary, but a good fail-safe

    return context;
}

export default UseInfoHook;