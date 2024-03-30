import {AuthToken, Status, User} from "tweeter-shared";
import {StatusService} from "../model/service/StatusService";
import {ToastView, Presenter} from "./Presenter";

export interface PostStatusView extends ToastView {
    setPost: (value: string) => void;
}

export class PostStatusPresenter extends Presenter {
    private _service: StatusService | null = null;

    public constructor(view: PostStatusView) {
        super(view);
    }

    protected get view(): PostStatusView {
        return super.view as PostStatusView;
    }

    public get service(): StatusService {
        if (this._service == null) {
            this._service = new StatusService();
        }

        return this._service;
    }

    public async submitPost(postContent: string, authToken: AuthToken, user: User) {
        await this.doFailureReportingOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);

            let status = new Status(postContent, user!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.view.clearLastInfoMessage();
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, 'post the status');
    };

    public clearPost() {
        this.view.setPost("");
    }

    public checkButtonStatus(post: string, authToken: AuthToken, currentUser: User): boolean {
        return !post.trim() || !authToken || !currentUser;
    };
}