import { User } from "tweeter-shared";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { FollowService } from "../model_service/FollowServiceFacade";

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService> {
    protected createService(): FollowService {
        return new FollowService();
    }
}   