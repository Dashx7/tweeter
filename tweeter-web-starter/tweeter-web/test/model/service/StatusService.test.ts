import {StatusService} from "../../../src/model/service/StatusService";
import {AuthToken, User} from "tweeter-shared";
import 'isomorphic-fetch';

describe("StatusService", () => {
    it("loadMoreStoryItems", async () => {
        const authToken = new AuthToken("1234", 1);
        const user = new User("Kathy", "Kunzler", "@kathy", "none");

        const [newItems, hasMore] = await new StatusService().loadMoreStoryItems(authToken, user, 10, null);

        expect(newItems).toBeDefined();
        expect(hasMore).toBe(true);
        expect(newItems.length).toBe(10);

        expect(newItems[0].user.alias).toBe("@allen");
        expect(newItems[9].user.alias).toBe("@elizabeth");
    });
});