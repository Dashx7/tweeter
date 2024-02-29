import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model_service/StatusService";
import { BasicView, MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
    setIsPostEmpty: (value: boolean) => void;
    setPostContent: (value: string) => void;
}
export class PostStatusPresenter extends Presenter {

    private service = new StatusService();
    private post: string = "";

    public constructor(view: PostStatusView) {
        super(view);
    }

    protected get view(): PostStatusView {
        return super.view as PostStatusView;
    }

    public submitPost = async (currentUser: User | null, authToken: AuthToken | null) => {
        this.DoFailureReportingOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);

            let status = new Status(this.post, currentUser!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.view.clearLastInfoMessage();
            this.Post = "";
            this.view.displayInfoMessage("Status posted!", 2000);
        }, "post the status");
    };

    public set Post(value: string) {
        this.post = value;
        this.view.setPostContent(value);
        this.view.setIsPostEmpty(!this.post.trim());
    }
    public get Post(): string {
        return this.post;
    }
}