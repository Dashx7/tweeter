import { AuthToken, User } from "tweeter-shared";

export interface UserItemView {
    addItems: (items: User[]) => void;
    displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
    private _view: UserItemView;
    private hasMoreItems: boolean = true;

    protected constructor(view: UserItemView) {
        this._view = view;
    }

    public getHasMoreItems(): boolean {
        return this.hasMoreItems;
    }
    protected setHasMoreItems(hasMore: boolean): void {
        this.hasMoreItems = hasMore;
    }

    protected get view() {
        return this._view;
    }

    public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}   