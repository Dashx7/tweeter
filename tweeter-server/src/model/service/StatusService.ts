import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { User } from "tweeter-shared/src/model/domain/User";
import { FakeData } from "tweeter-shared/src/util/FakeData";
import { Status } from "tweeter-shared/src/model/domain/Status";

export class StatusService {

    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    };

    public async postStatus(
        authToken: AuthToken,
        status: Status
    ): Promise<void> {
        await new Promise((f) => setTimeout(f, 2000));
    }
}