import { AuthToken, User } from "tweeter-shared";
import { BasicView, Presenter } from "./Presenter";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends BasicView {
    addItems: (items: T[]) => void;
}

export abstract class PagedItemPresenter<T, U> extends Presenter {
    private _hasMoreItems: boolean = true;
    private _last: T | null = null;
    private _service: U;

    public constructor(view: PagedItemView<T>) {
        super(view);
        this._service = this.createService();
    }

    protected get view(): PagedItemView<T> {
        return super.view as PagedItemView<T>;
    }

    public getHasMoreItems(): boolean {
        return this._hasMoreItems;
    }
    protected setHasMoreItems(hasMore: boolean): void {
        this._hasMoreItems = hasMore;
    }

    protected get lastItem(): T | null {
        return this._last;
    }

    protected set lastItem(item: T | null) {
        this._last = item;
    }

    protected get service(): U {
        return this._service;
    }


    public async loadMoreItems(authToken: AuthToken, user: User) {
        this.DoFailureReportingOperation(async () => {
            if (this.getHasMoreItems()) {
                let [newItems, hasMore] = await this.getMoreItems(
                    authToken, user);
                this.setHasMoreItems(hasMore);
                this.lastItem = newItems[newItems.length - 1];
                this.view.addItems(newItems);
            }
        }, this.getItemDescription());
    };

    protected abstract getItemDescription(): string;

    protected abstract getMoreItems(authToken: AuthToken, user: User): Promise<[T[], boolean]>;

    protected abstract createService(): U;
}
