import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model_service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;

//TODO, extract out more common code between FollowingPresenter and FollowerPresenter
export class FollowingPresenter extends UserItemPresenter {
    private service: FollowService;

    public constructor(view: UserItemView) {
        super(view);
        this.service = new FollowService();
    }

    protected get view(): UserItemView {
        return this.view as UserItemView;
    }

    public async loadMoreItems(authToken: AuthToken, user: User) {
        this.DoFailureReportingOperation(async () => {
            if (this.getHasMoreItems()) {
                let [newItems, hasMore] = await this.service.loadMoreFollowees(authToken, user, PAGE_SIZE, this.lastItemUser);
                this.setHasMoreItems(hasMore);
                this.lastItemUser = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        }, "load followee items");
    };
}