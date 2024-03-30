import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model_service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
    setPostContent: (value: string) => void;
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
        if (this._service === null) {
            this._service = new StatusService();
        }
        return this._service;
    }

    public submitPost = async (currentUser: User | null, authToken: AuthToken | null, post: string) => {
        this.DoFailureReportingOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);

            let status = new Status(post, currentUser!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.view.clearLastInfoMessage();
            this.view.setPostContent("");
            this.view.displayInfoMessage("Status posted!", 2000);
            console.log("Status posted!");
        }, "post the status");
    };
}