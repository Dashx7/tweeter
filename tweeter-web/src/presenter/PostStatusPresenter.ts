import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model_service/StatusService";

export interface PostStatusView {
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
    setIsPostEmpty: (value: boolean) => void;
    setPostContent: (value: string) => void;
}
export class PostStatusPresenter {

    private myView: PostStatusView;
    private service = new StatusService();
    private post: string = "";

    public constructor(view: PostStatusView) {
        this.myView = view;
    }

    public submitPost = async (currentUser: User | null, authToken: AuthToken | null) => {
        try {
            this.myView.displayInfoMessage("Posting status...", 0);

            let status = new Status(this.post, currentUser!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.myView.clearLastInfoMessage();
            this.Post = "";
            this.myView.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
            this.myView.displayErrorMessage(
                `Failed to post the status because of exception: ${error}`
            );
        }
    };

    public set Post(value: string) {
        this.post = value;
        this.myView.setPostContent(value);
        this.myView.setIsPostEmpty(!this.post.trim());
    }
    public get Post(): string {
        return this.post;
    }



}