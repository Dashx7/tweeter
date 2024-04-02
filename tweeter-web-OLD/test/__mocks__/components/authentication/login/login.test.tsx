import { MemoryRouter } from "react-router-dom";
import Login from "../../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../../src/presenter/LoginPresenter";
import { anything, capture, instance, mock } from "ts-mockito";
import { verify } from "ts-mockito";
library.add(fab);

describe("Login component", () => {
  it("When first rendered the sign-in button is disabled.", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("The sign-in button is enabled when both the alias and password fields have text.", async () => {
    const { signInButton, username, password } = renderLoginAndGetElements("/");

    await userEvent.type(username, "test1");
    await userEvent.type(password, "test2");

    expect(signInButton).toBeEnabled();
  });

  it("The sign-in button is disabled if either the alias or password field is cleared.", async () => {
    const { signInButton, username, password } = renderLoginAndGetElements("/");

    await userEvent.type(username, "test");
    await userEvent.type(password, "test");
    expect(signInButton).toBeEnabled();
    await userEvent.clear(username);
    expect(signInButton).toBeDisabled();
    await userEvent.type(username, "test");
    expect(signInButton).toBeEnabled();
    await userEvent.clear(password);
    expect(signInButton).toBeDisabled();
  });

  it("The presenter's login method is called with correct parameters when the sign-in button is pressed.", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const originalUrl = "https://someurl.com";
    const alias = "@Alias";
    const passwordTest = "myPassword";

    const { signInButton, username, password } = renderLoginAndGetElements(
      "",
      mockPresenterInstance
    );

    await userEvent.type(username, alias);
    await userEvent.type(password, passwordTest);

    await userEvent.click(signInButton);

    verify(mockPresenter.doLogin(anything(), anything(), anything())).once();
    verify(mockPresenter.doLogin(anything(), alias, passwordTest)).once();

    capture(mockPresenter.doLogin).last();
  });
});

const renderLogin = (orinalUrl: string, presenter?: LoginPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={orinalUrl} presenter={presenter} />
      ) : (
        <Login originalUrl={orinalUrl} />
      )}
    </MemoryRouter>
  );
};

const renderLoginAndGetElements = (
  orinalUrl: string,
  presenter?: LoginPresenter
) => {
  const user = userEvent.setup();

  renderLogin(orinalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const username = screen.getByLabelText("alias");
  const password = screen.getByLabelText("password");

  return { signInButton, username, password };
};

async function typeCredentials(
  usernameElement: HTMLElement,
  passwordElement: HTMLElement
) {
  await userEvent.type(usernameElement, "test1");
  await userEvent.type(passwordElement, "test2");
}
