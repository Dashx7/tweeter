import { AuthToken } from "tweeter-shared";
import { AppNavbarPresenter, AppNavbarView } from "../../../src/presenter/AppNavBarPresenter"
import { instance, mock, verify, spy, when, capture, anything } from "ts-mockito";
import { UserService } from "../../../src/model_service/UserService";


describe("AppNavBarPresenter", () => {
    let mockAppNavBarView: AppNavbarView;
    let appNavBarPresenter: AppNavbarPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now())

    beforeEach(() => {
        //Create the view and make an instance of it
        mockAppNavBarView = mock<AppNavbarView>();
        const mockAppNavBarViewInstance = instance(mockAppNavBarView);

        //Create a sp
        const AppNavBarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavBarViewInstance));
        appNavBarPresenter = instance(AppNavBarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(AppNavBarPresenterSpy.service).thenReturn(mockUserServiceInstance);
    });
    it("tells the view to display a logging out message", async () => {
        await appNavBarPresenter.logOut(authToken);
        verify(mockAppNavBarView.displayInfoMessage("Logging Out...", 0)).once();
    });
    it("calls logout on the user service with the correct auth token", async () => {
        await appNavBarPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();

        //Or you can write it using ts-mockito's capture function
        let [capturedAuthToken] = capture(mockUserService.logout).last();
        expect(capturedAuthToken).toEqual(authToken);
    });
    it("tells the view to clear the last info message, clear the user ingor, and navigate to the login page", async () => {
        await appNavBarPresenter.logOut(authToken);

        verify(mockAppNavBarView.displayErrorMessage(anything())).never();

        verify(mockAppNavBarView.clearLastInfoMessage()).once();
        verify(mockAppNavBarView.clearUserInfo()).once();
    });
    it("displys an error message if the logout fails and does not clear last info message or user info, and doesn't renavigate", async () => {
        when(mockUserService.logout(authToken)).thenThrow(new Error("Logout failed"));

        await appNavBarPresenter.logOut(authToken);

        verify(mockAppNavBarView.displayErrorMessage("Failed to log user out because of exception: Error: Logout failed")).once();
        // let [capturedErrorMessage] = capture(mockAppNavBarView.displayErrorMessage).last();
        // console.log(capturedErrorMessage);
        // expect(capturedErrorMessage).toEqual();

        verify(mockAppNavBarView.clearLastInfoMessage()).never();
        verify(mockAppNavBarView.clearUserInfo()).never();
    });
});