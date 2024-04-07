import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoListenerHook";
import { RegisterPresenter } from "../../../presenter/RegisterPresenter";
import { AuthenticationView } from "../../../presenter/AuthenticationPresenter";
import { AuthToken, User } from "tweeter-shared";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  const [rememberMe, setRememberMe] = useState(false);

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: AuthenticationView = {
    displayErrorMessage: displayErrorMessage,
    updateUserInfo: (
      currentUser: User,
      displayedUser: User | null,
      authToken: AuthToken
    ) =>
      updateUserInfo(
        currentUser,
        displayedUser,
        authToken,
        rememberMeRef.current
      ),
    navigate: navigate,
  };

  const [presenter] = useState(new RegisterPresenter(listener));

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageBytes(await presenter.handleImageFile(file));
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="firstNameInput"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="firstNameInput">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="lastNameInput"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor="lastNameInput">Last Name</label>
        </div>
        <AuthenticationFields setAlias={setAlias} setPassword={setPassword} />
        <div className="form-floating mb-3">
          <input
            type="file"
            className="d-inline-block py-5 px-4 form-control bottom"
            id="imageFileInput"
            onChange={handleFileChange}
          />
          <label htmlFor="imageFileInput">User Image</label>
          <img src={presenter.imageUrl} className="img-thumbnail" alt=""></img>
        </div>
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Already registered? <Link to="/login">Sign in</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Register"
      submitButtonLabel="Register"
      oAuthHeading="Register with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() =>
        presenter.checkSubmitButtonStatus(firstName, lastName, alias, password)
      }
      submit={() =>
        presenter.doRegister(firstName, lastName, alias, password, imageBytes)
      }
    />
  );
};

export default Register;
