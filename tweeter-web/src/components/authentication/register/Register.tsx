import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import UseInfoHook from "../../userInfo/UseInfoHook";
import { RegisterPresenter } from "../../../presenter/RegisterPresenter";
import { AuthenticationView } from "../../../presenter/AuthenticationPresenter";

//State variables that the user see, they will stay in the view
const Register = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = UseInfoHook();
  const { displayErrorMessage } = useToastListener();

  const listener: AuthenticationView = {
    updateUserInfo: (user, displayedUser, authToken) =>
      updateUserInfo(user, displayedUser, authToken, rememberMeRef.current),
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
  };

  //Use state variables to keep track of the state of the view
  const [presenter] = useState(new RegisterPresenter(listener));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageBytes(presenter.handleImageFile(file));
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
        <AuthenticationFields
          setAlias={(value: string) => setAlias(value)}
          setPassword={(value: string) => setPassword(value)}
        />
        <div className="form-floating mb-3">
          <input
            type="file"
            className="d-inline-block py-5 px-4 form-control bottom"
            id="imageFileInput"
            onChange={handleFileChange}
          />
          <label htmlFor="imageFileInput">User Image</label>
          <img src={presenter.ImageURL} className="img-thumbnail" alt=""></img>
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
        presenter.checkSubmitButtonStatus(alias, password, firstName, lastName)
      }
      submit={() =>
        presenter.doRegister(alias, password, firstName, lastName, imageBytes)
      }
    />
  );
};

export default Register;
