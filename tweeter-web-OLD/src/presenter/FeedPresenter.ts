//Make the View as dumb as possible, and put all the logic in the Presenter. 
import { AuthToken, User } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

//TODO, extract out more common code between StoryPresenter and FeedPresenter
export class FeedPresenter extends StatusItemPresenter {
    protected getItemDescription(): string {
        return "load feed items";
    }
    protected getMoreItems(authToken: AuthToken, user: User): Promise<[any[], boolean]> {
        return this.service.loadMoreFeedItems(authToken, user, PAGE_SIZE, this.lastItem);
    }
}   