import {StatusItemPresenter} from "./StatusItemPresenter";
import {AuthToken, Status, User} from "tweeter-shared";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {

    protected getItemDescription(): string {
        return "load feed items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[Status[], boolean]> {
        return this.service.loadMoreFeedItems(
            authToken!,
            user!,
            PAGE_SIZE,
            this.lastItem
        );
    }
}
