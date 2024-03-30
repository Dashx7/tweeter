import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoListenerHook";
import {AuthenticationView} from "../../../presenter/AuthenticationPresenter";
import {LoginPresenter} from "../../../presenter/LoginPresenter";
import {AuthToken, User} from "tweeter-shared";

interface Props {
    originalUrl?: string;
    presenter?: LoginPresenter;
}

const Login = (props: Props) => {
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const {updateUserInfo} = useUserInfo();
    const {displayErrorMessage} = useToastListener();

    const rememberMeRef = useRef(rememberMe);
    rememberMeRef.current = rememberMe;

    const listener: AuthenticationView = {
        displayErrorMessage: displayErrorMessage,
        updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken) => updateUserInfo(currentUser, displayedUser, authToken, rememberMeRef.current),
        navigate: navigate
    };

    const [presenter] = useState(props.presenter ?? new LoginPresenter(listener));

    const inputFieldGenerator = () => {
        return (
            <AuthenticationFields setAlias={setAlias}
                                  setPassword={setPassword}/>
        );
    };

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Not registered? <Link to="/register">Register</Link>
            </div>
        );
    };

    return (
        <AuthenticationFormLayout
            headingText="Please Sign In"
            submitButtonLabel="Sign in"
            oAuthHeading="Sign in with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
            setRememberMe={setRememberMe}
            submitButtonDisabled={() => presenter.checkSubmitButtonStatus(alias, password)}
            submit={() => presenter.doLogin(alias, password, props.originalUrl)}
        />
    );
};

export default Login;
