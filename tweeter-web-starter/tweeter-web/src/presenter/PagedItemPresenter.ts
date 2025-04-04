import {Presenter, View} from "./Presenter";
import {AuthToken, User} from "tweeter-shared";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems: (items: T[]) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter {
    private readonly _service: U;
    private _hasMoreItems: boolean = true;
    private _lastItem: T | null = null;

    public constructor(view: PagedItemView<T>) {
        super(view);
        this._service = this.createService();
    }

    protected abstract createService(): U;

    protected get service() {
        return this._service;
    }

    protected get view(): PagedItemView<T> {
        return super.view as PagedItemView<T>;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(user) {
        this._lastItem = user;
    }

    public async loadMoreItems(authToken: AuthToken, user: User) {
        await this.doFailureReportingOperation(async () => {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.getMoreItems(
                    authToken!,
                    user!,
                );

                this.hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        }, this.getItemDescription())
    }

    protected abstract getMoreItems(authToken: AuthToken, user: User): Promise<[T[], boolean]>;

    protected abstract getItemDescription(): string;
}