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
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const listener: AuthenticationView = {
    updateUserInfo: updateUserInfo,
    displayErrorMessage: displayErrorMessage,
    navigate: navigate,
    updateSubmitButtonStatus: setSubmitDisabled,
    // setAlias,
  };

  const [presenter] = useState(new RegisterPresenter(listener));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  const [imageUrl, setImageUrl] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    presenter.handleImageFile(file);
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
            onChange={(event) => (presenter.FirstName = event.target.value)}
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
            onChange={(event) => (presenter.LastName = event.target.value)}
          />
          <label htmlFor="lastNameInput">Last Name</label>
        </div>
        <AuthenticationFields
          setAlias={(value: string) => (presenter.Alias = value)}
          setPassword={(value: string) => (presenter.Password = value)}
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
        Algready registered? <Link to="/login">Sign in</Link>
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
      submitButtonDisabled={submitDisabled}
      submit={() => presenter.doRegister(rememberMeRef.current, imageUrl)}
    />
  );
};

export default Register;
