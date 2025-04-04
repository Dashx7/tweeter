import {StatusItemPresenter} from "./StatusItemPresenter";
import {AuthToken, Status, User} from "tweeter-shared";
import {PAGE_SIZE} from "./PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {

    protected getItemDescription(): string {
        return "load story items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[Status[], boolean]> {
        return this.service.loadMoreStoryItems(
            authToken!,
            user!,
            PAGE_SIZE,
            this.lastItem
        );
    }
}

