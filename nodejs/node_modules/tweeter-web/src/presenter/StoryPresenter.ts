//Make the View as dumb as possible, and put all the logic in the Presenter. 
import { AuthToken, User } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

//TODO, extract out more common code between StoryPresenter and FeedPresenter
export class StoryPresenter extends StatusItemPresenter {
    protected getItemDescription(): string {
        return "load story items";
    }
    protected getMoreItems(authToken: AuthToken, user: User): Promise<[any[], boolean]> {
        return this.service.loadMoreStoryItems(authToken, user, PAGE_SIZE, this.lastItem);
    }
}   