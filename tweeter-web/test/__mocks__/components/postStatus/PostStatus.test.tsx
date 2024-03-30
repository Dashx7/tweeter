import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { anything, instance, mock } from "ts-mockito";
import { verify } from "ts-mockito";
import { PostStatusPresenter } from "../../../../src/presenter/PostStatusPresenter";
import PostStatus from "../../../../src/components/postStatus/PostStatus";
import UseInfoHook from "../../../../src/components/userInfo/UseInfoHook";
import { AuthToken, User } from "tweeter-shared";
library.add(fab);

jest.mock("../../../../src/components/userInfo/UseInfoHook", () => ({
  ...jest.requireActual("../../../../src/components/userInfo/UseInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

describe("Login component", () => {
  const mockUser = mock<User>();
  const mockUserInstance = instance(mockUser);

  const mockAuthToken = mock<AuthToken>();
  const mockAuthTokenInstance = instance(mockAuthToken);

  beforeAll(() => {
    (UseInfoHook as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });

  it("When first rendered the Post Status and Clear buttons are both disabled.", () => {
    const { submitStatusButton, clearStatusButton } =
      renderPostAndGetElements();

    expect(submitStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });
  it("The sign-in button is enabled when both the alias and password fields have text.", async () => {
    const { submitStatusButton, clearStatusButton, postStatusTextArea } =
      renderPostAndGetElements();

    await userEvent.type(postStatusTextArea, "test");

    expect(postStatusTextArea).toHaveValue("test"); // This is a test to see if the value is being set correctly

    expect(submitStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
  });
  it("The sign-in button is disabled if either the alias or password field is cleared.", async () => {
    const { submitStatusButton, clearStatusButton, postStatusTextArea } =
      renderPostAndGetElements();

    await userEvent.type(postStatusTextArea, "test");
    expect(submitStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
    await userEvent.clear(postStatusTextArea);
    expect(submitStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
    await userEvent.type(postStatusTextArea, "test");
  });
  it("The presenter's login method is called with correct parameters when the sign-in button is pressed.", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { submitStatusButton, postStatusTextArea } = renderPostAndGetElements(
      mockPresenterInstance
    );

    await userEvent.type(postStatusTextArea, "test");
    await userEvent.click(submitStatusButton);

    verify(mockPresenter.submitPost(anything(), anything(), anything())).once();
    verify(
      mockPresenter.submitPost(mockUserInstance, mockAuthTokenInstance, "test")
    ).once();
  });
});

const renderPost = (presenter?: PostStatusPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
    </MemoryRouter>
  );
};

const renderPostAndGetElements = (presenter?: PostStatusPresenter) => {
  renderPost(presenter);

  const submitStatusButton = screen.getByLabelText("submitButton");
  const clearStatusButton = screen.getByLabelText("clearButton");
  const postStatusTextArea = screen.getByLabelText("textbox");

  return { submitStatusButton, clearStatusButton, postStatusTextArea };
};
