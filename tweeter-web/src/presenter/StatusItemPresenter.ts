import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model_service/StatusService";
import { BasicView, Presenter } from "./Presenter";

export interface StatusItemView extends BasicView {
    addItems: (items: Status[]) => void;
}

export abstract class StatusItemPresenter extends Presenter {
    private hasMoreItems: boolean = true;
    private lastItem: Status | null = null;

    protected service: StatusService;

    protected constructor(view: StatusItemView) {
        super(view);
        this.service = new StatusService();
    }

    public getHasMoreItems(): boolean {
        return this.hasMoreItems;
    }
    protected setHasMoreItems(hasMore: boolean): void {
        this.hasMoreItems = hasMore;
    }

    protected get lastItemStatus(): Status | null {
        return this.lastItem;
    }

    protected set lastItemStatus(status: Status | null) {
        this.lastItem = status;
    }

    protected get serviceStatus(): StatusService {
        return this.service;
    }

    public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}   