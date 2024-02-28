//Make the View as dumb as possible, and put all the logic in the Presenter. 
import { AuthToken, Status, User } from "tweeter-shared";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export const PAGE_SIZE = 10;

//TODO, extract out more common code between StoryPresenter and FeedPresenter
export class FeedPresenter extends StatusItemPresenter {
    public constructor(view: StatusItemView) {
        super(view);
    }

    protected get view(): StatusItemView {
        return this.view as StatusItemView;
    }

    public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
        this.DoFailureReportingOperation(async () => {
            if (this.getHasMoreItems()) {
                let [newItems, hasMore] = await this.service.loadMoreFeedItems(
                    authToken!,
                    displayedUser!,
                    PAGE_SIZE,
                    this.lastItemStatus
                );

                this.setHasMoreItems(hasMore);
                this.lastItemStatus = (newItems[newItems.length - 1]);
                this.view.addItems(newItems);
            }
        }, "load feed items");
    };
}   