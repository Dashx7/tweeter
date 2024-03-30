import {NavbarPresenter, NavbarView} from "../../src/presenter/NavbarPresenter"
import {anything, instance, mock, spy, verify, when} from "ts-mockito";
import {AuthToken} from "tweeter-shared";
import {UserService} from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {
    let mockNavbarView: NavbarView;
    let navbarPresenter: NavbarPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc", 0);

    beforeEach(() => {
        mockNavbarView = mock<NavbarView>();
        const mockNavbarViewInstance = instance(mockNavbarView);

        const navbarPresenterSpy = spy(new NavbarPresenter(mockNavbarViewInstance));
        navbarPresenter = instance(navbarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(navbarPresenterSpy.service).thenReturn(mockUserServiceInstance);
    });

    it("tells the view to display a logging out message", async () => {
        await navbarPresenter.logOut(authToken);
        verify(mockNavbarView.displayInfoMessage("Logging Out...", 0)).called();
    });

    it("calls logout on the user service with the correct auth token", async () => {
        await navbarPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    });

    it("tells the view to clear the last info message, clear the user info, and navigate to the login page when logout is successful", async () => {
        await navbarPresenter.logOut(authToken);

        verify(mockNavbarView.clearLastInfoMessage()).once();
        verify(mockNavbarView.clearUserInfo()).once();
        // navigate to the login page does not exist

        verify(mockNavbarView.displayErrorMessage(anything())).never();
    })

    it("displays an error message does not clear the last info mesage, clear the user info, and navigate to the login page when logout fails", async () => {
        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await navbarPresenter.logOut(authToken);

        verify(mockNavbarView.displayErrorMessage(`Failed to log user out because of exception: An error occurred`)).once();
        verify(mockNavbarView.clearLastInfoMessage()).never();
        verify(mockNavbarView.clearUserInfo()).never();
    });
});