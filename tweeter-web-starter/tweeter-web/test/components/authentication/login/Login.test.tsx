import React from "react";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserEvent, userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenter/LoginPresenter";
import { instance, mock, verify } from "ts-mockito";

library.add(fab);

describe("Login Component", () => {
  const typeCredentials = async (
    aliasField: HTMLElement,
    passwordField: HTMLElement,
    user: UserEvent,
    alias: string,
    password: string
  ) => {
    await user.type(aliasField, alias);
    await user.type(passwordField, password);
  };

  it("starts with the sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables the sign-in button if both alias and password fields have text", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/");

    await typeCredentials(aliasField, passwordField, user, "a", "b");

    expect(signInButton).toBeEnabled();
  });

  it("disables the sign-in button if either field is cleared", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/");

    await typeCredentials(aliasField, passwordField, user, "a", "b");
    expect(signInButton).toBeEnabled();

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();

    await user.type(aliasField, "1");
    expect(signInButton).toBeEnabled();

    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();
  });

  it("calls the presenters login method with correct parameters when the sign-in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const originalUrl = "https://someurl.com";
    const alias = "@SomeAlias";
    const password = "myPassword";

    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements(originalUrl, mockPresenterInstance);

    await typeCredentials(aliasField, passwordField, user, alias, password);
    await user.click(signInButton);

    verify(mockPresenter.doLogin(alias, password, originalUrl)).once();
  });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter} />
      ) : (
        <Login originalUrl={originalUrl} />
      )}
    </MemoryRouter>
  );
};

const renderLoginAndGetElements = (
  originalUrl: string,
  presenter?: LoginPresenter
) => {
  const user = userEvent.setup();

  renderLogin(originalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { signInButton, aliasField, passwordField, user };
};
