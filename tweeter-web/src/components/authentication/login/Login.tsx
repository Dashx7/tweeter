import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import UseInfoHook from "../../userInfo/UseInfoHook";
import { LoginPresenter } from "../../../presenter/LoginPresenter";
import { AuthenticationView } from "../../../presenter/AuthenticationPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { updateUserInfo } = UseInfoHook();
  const { displayErrorMessage } = useToastListener();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const listener: AuthenticationView = {
    updateUserInfo: (user, displayedUser, authToken) =>
      updateUserInfo(user, displayedUser, authToken, rememberMeRef.current),
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
  };
  const [presenter] = useState(new LoginPresenter(listener));

  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const inputFieldGenerator = () => {
    return (
      <AuthenticationFields
        setAlias={(value: string) => setAlias(value)}
        setPassword={(value: string) => setPassword(value)}
      />
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
      submitButtonDisabled={() =>
        presenter.checkSubmitButtonStatus(alias, password)
      }
      submit={() => presenter.doLogin(props.originalUrl, alias, password)}
    />
  );
};

export default Login;
