import { Status } from "tweeter-shared";
import { StatusService } from "../model_service/StatusServiceFacade";
import { PagedItemPresenter } from "./PagedItemPresenter";

export abstract class StatusItemPresenter extends PagedItemPresenter<Status, StatusService> {
    protected createService(): StatusService {
        return new StatusService();
    }
}   