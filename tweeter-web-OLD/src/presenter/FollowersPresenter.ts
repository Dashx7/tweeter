import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

//TODO, extract out more common code between FollowingPresenter and FollowerPresenter
export class FollowersPresenter extends UserItemPresenter {
    protected getItemDescription(): string {
        return "load follower items";
    }

    protected getMoreItems(authToken: AuthToken, user: User): Promise<[any[], boolean]> {
        return this.service.loadMoreFollowers(authToken, user, PAGE_SIZE, this.lastItem);
    }
}