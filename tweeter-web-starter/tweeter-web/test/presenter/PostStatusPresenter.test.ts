import {anything, capture, instance, mock, spy, verify, when} from "ts-mockito";
import {AuthToken, User} from "tweeter-shared";
import {PostStatusPresenter, PostStatusView} from "../../src/presenter/PostStatusPresenter";
import {StatusService} from "../../src/model/service/StatusService";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;

    const authToken = new AuthToken("abc", 0);
    const user = new User("John", "Doe", "@johndoe", ".");
    const statusString = "Test string";

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(postStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);
    });

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(statusString, authToken, user);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).called();
    });

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
        await postStatusPresenter.submitPost(statusString, authToken, user);

        let [gotAuthToken, gotStatus] = capture(mockStatusService.postStatus).last();

        expect(gotAuthToken).toEqual(authToken);
        expect(gotStatus.post).toEqual(statusString);
        expect(gotStatus.user).toEqual(user);
    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message when post status is successful", async () => {
        await postStatusPresenter.submitPost(statusString, authToken, user);

        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    })

    it("tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message when post status fails", async () => {
        const error = new Error("An error occurred");
        when(mockStatusService.postStatus(authToken, anything())).thenThrow(error);

        await postStatusPresenter.submitPost(statusString, authToken, user);

        verify(mockPostStatusView.displayErrorMessage(`Failed to post the status because of exception: An error occurred`)).once();

        verify(mockPostStatusView.clearLastInfoMessage()).never();
        verify(mockPostStatusView.setPost("")).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });
});