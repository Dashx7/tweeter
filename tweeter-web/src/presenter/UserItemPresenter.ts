import { AuthToken, User } from "tweeter-shared";
import { BasicView, Presenter } from "./Presenter";

export interface UserItemView extends BasicView {
    addItems: (items: User[]) => void;
}

export abstract class UserItemPresenter extends Presenter {
    private hasMoreItems: boolean = true;
    private lastItem: User | null = null;

    protected constructor(view: UserItemView) {
        super(view);
    }

    public getHasMoreItems(): boolean {
        return this.hasMoreItems;
    }
    protected setHasMoreItems(hasMore: boolean): void {
        this.hasMoreItems = hasMore;
    }

    protected get lastItemUser(): User | null {
        return this.lastItem;
    }

    protected set lastItemUser(user: User | null) {
        this.lastItem = user;
    }

    public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}   