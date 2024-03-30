import useUserInfo from "../../../src/components/userInfo/UserInfoListenerHook";
import {AuthToken, User} from "tweeter-shared";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {PostStatusPresenter} from "../../../src/presenter/PostStatusPresenter";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import {userEvent} from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {instance, mock, verify} from "ts-mockito";

jest.mock("../../../src/components/userInfo/UserInfoListenerHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoListenerHook"),
    __esModule: true,
    default: jest.fn(),
}));

describe("PostStatus Component", () => {
    const mockAuthToken = new AuthToken("abc", 0);
    const mockUser = new User("John", "Doe", "@johndoe", ".");

    beforeAll(() => {
        (useUserInfo as jest.Mock).mockReturnValue({
            currentUser: mockUser,
            authToken: mockAuthToken,
        });
    })

    it("starts with post status and clear buttons disabled", () => {
        const {postStatusButton, clearButton} = renderPostStatusAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it("enables both buttons if the text field has text", async () => {
        const {postStatusButton, clearButton, postStatusTextArea, user} = renderPostStatusAndGetElements();

        await user.type(postStatusTextArea, "a");

        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
    });

    it("disables both buttons if the text field is cleared", async () => {
        const {postStatusButton, clearButton, postStatusTextArea, user} = renderPostStatusAndGetElements();

        await user.type(postStatusTextArea, "a");
        expect(postStatusButton).toBeEnabled();
        expect(clearButton).toBeEnabled();

        await user.clear(postStatusTextArea);
        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });

    it("calls the presenters postStatus method with correct parameters when the post button is pressed", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const {
            postStatusButton,
            clearButton,
            postStatusTextArea,
            user
        } = renderPostStatusAndGetElements(mockPresenterInstance);

        const postContent = "Some content";

        await user.type(postStatusTextArea, postContent);
        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(postContent, mockAuthToken, mockUser)).once();
    });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? (<PostStatus presenter={presenter}/>) : (
                <PostStatus/>)}
        </MemoryRouter>
    );
}

const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const postStatusButton = screen.getByRole("button", {name: /Post Status/i});
    const clearButton = screen.getByRole("button", {name: /Clear/i});
    const postStatusTextArea = screen.getByLabelText("postStatusTextArea");

    return {postStatusButton, clearButton, postStatusTextArea, user};
}