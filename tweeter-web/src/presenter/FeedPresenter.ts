//Make the View as dumb as possible, and put all the logic in the Presenter. 
import { AuthToken, Status, User } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export const PAGE_SIZE = 10;

export class FeedPresenter extends StatusItemPresenter {
    private lastItem: Status | null = null;

    public constructor(view: StatusItemView) {
        super(view);
    }

    public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
        try {
            if (this.getHasMoreItems()) {
                let [newItems, hasMore] = await this.service.loadMoreFeedItems(
                    authToken!,
                    displayedUser!,
                    PAGE_SIZE,
                    this.lastItem
                );

                this.setHasMoreItems(hasMore);
                this.lastItem = (newItems[newItems.length - 1]);
                this.view.addItems(newItems);
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to load Feed items because of exception: ${error}`
            );
        }
    };
}   