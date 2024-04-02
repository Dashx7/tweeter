import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

//TODO, extract out more common code between FollowingPresenter and FollowerPresenter
export class FollowingPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load following items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[any[], boolean]> {
        return this.service.loadMoreFollowees(authToken, user, PAGE_SIZE, this.lastItem);
    }
}