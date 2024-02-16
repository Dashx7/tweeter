import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model_service/StatusService";

export interface StatusItemView {
    addItems: (items: Status[]) => void;
    displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
    private _view: StatusItemView;
    private hasMoreItems: boolean = true;
    protected service: StatusService;

    protected constructor(view: StatusItemView) {
        this._view = view;
        this.service = new StatusService();
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