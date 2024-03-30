import { ServerFacade } from "../../src/net/ServerFacade";
import { FollowerOperationsRequest, LoadMoreUserItemsRequest, LoginRequest, RegisterRequest, User } from "tweeter-shared";
import 'isomorphic-fetch';
import { Buffer } from "buffer";

describe("ServerFacade", () => {
    const FAKE_USER = new User("Allen", "Anderson", "@allen", "NOT TESTED");

    it("register endpoint", async () => {
        const response = await new ServerFacade().register(new RegisterRequest(FAKE_USER.firstName, FAKE_USER.lastName, FAKE_USER.alias, "test", Buffer.from(Uint8Array.of(1, 2, 3, 4)).toString('base64')));

        expect(response.success).toBe(true);
        expect(response.user.alias).toBe(FAKE_USER.alias);
        expect(response.user.firstName).toBe(FAKE_USER.firstName);
        expect(response.user.lastName).toBe(FAKE_USER.lastName);
        expect(response.token).toBeDefined();
    });

    it("getFollowers endpoint", async () => {
        const loginResponse = await new ServerFacade().login(new LoginRequest(FAKE_USER.alias.substring(1), "test"));

        expect(loginResponse.success).toBe(true);
        expect(loginResponse.token).toBeDefined();

        const response = await new ServerFacade().loadMoreFollowers(new LoadMoreUserItemsRequest(
            loginResponse.token,
            loginResponse.user,
            10,
            null
        ));

        expect(response.success).toBe(true);
        expect(response.newItems).toBeDefined();
        expect(response.hasMore).toBe(true);
        expect(response.newItems.length).toBe(10);

        expect(response.newItems[0].alias).toBe("@allen");
        expect(response.newItems[9].alias).toBe("@elizabeth");
    });

    it("getFollowingCount endpoint", async () => {
        const loginResponse = await new ServerFacade().login(new LoginRequest("test", "test"));

        expect(loginResponse.success).toBe(true);
        expect(loginResponse.user).toBeDefined();
        expect(loginResponse.token).toBeDefined();

        const response = await new ServerFacade().getFolloweesCount(new FollowerOperationsRequest(
            loginResponse.token,
            loginResponse.user
        ));

        expect(response.success).toBe(true);
        expect(response.followCount).toBe(10);
    });
});