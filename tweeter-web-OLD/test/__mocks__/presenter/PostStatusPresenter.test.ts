import { instance, mock, verify, spy, when, capture, anything } from "ts-mockito";
import { PostStatusPresenter, PostStatusView } from "../../../src/presenter/PostStatusPresenter";
import { StatusService } from "../../../src/model_service/StatusService";
import { AuthToken, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;

    const authToken = new AuthToken("abc123", Date.now())
    const user = new User("Test", "testington", "T-man", "IMAGE URL");
    const post = "This is a test post";

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const PostStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(PostStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(PostStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);
    });

    it("The presenter tells the view to display a posting status message.", () => {
        postStatusPresenter.submitPost(user, authToken, post);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    });

    it("The presenter calls postStatus on the post status service with the correct status string and auth token.", async () => {
        await postStatusPresenter.submitPost(user, authToken, post);

        verify(mockStatusService.postStatus(authToken, anything())).once();
    });
    it("When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.", async () => {
        await postStatusPresenter.submitPost(user, authToken, post);

        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPostContent(anything())).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
    });
    it("When posting of the status is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message.", async () => {
        when(mockStatusService.postStatus(authToken, anything())).thenThrow(new Error("Status posting failed"));

        await postStatusPresenter.submitPost(user, authToken, post);

        verify(mockPostStatusView.displayErrorMessage("Failed to post the status because of exception: Error: Status posting failed")).once();

        verify(mockPostStatusView.clearLastInfoMessage()).never();
        verify(mockPostStatusView.setPostContent(anything())).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });
});