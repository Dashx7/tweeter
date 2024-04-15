import { AuthToken, User, Status, FakeData } from "tweeter-shared";
import { BaseService } from "./BaseService";
import { AuthTokenTableDAO } from "../../DAOs/AuthTokenTableDAO";
import { PostBlockRequest } from "tweeter-shared/dist/model/net/Request";

const maxBlock = 25;

export class StatusService extends BaseService {
    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        AuthTokenTableDAO.authenticate(authToken);

        console.log("Loading more story items");
        console.log("User: " + user.toJson());
        console.log("PageSize: " + pageSize);
        console.log("LastItem: " + lastItem);

        const response = await this.getStoryDAO().loadMoreStoryItems(user, pageSize, lastItem);
        console.log("Got back response in status service :" + response.toString());
        return response;
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        AuthTokenTableDAO.authenticate(authToken);

        await this.getStoryDAO().postStatus(newStatus); //Post to the story DAO

        await this.getQueueDAO().sendToOriginalPostQ(newStatus); // First main step. Send the status to the Original Post Queue

        return; // Should run in < 1 second
    };

    // Second main step. Turn a status into a list of PostBlocks (string lists themselves)
    public async originalPostChopper(status: Status): Promise<void> {
        console.log("Chopping status into blocks");
        if (status == null) {
            throw new Error("Status is undefined");
        }
        console.log("Status: " + JSON.stringify(status));
        if (status.user == null) {
            throw new Error("User is undefined");
        }

        const [followers] = await this.getFollowDAO().loadMoreFollowers(status.user, 100, null); // Get the followers of the user
        console.log("Followers: " + followers);

        const followersBlocks: string[][] = this.chunkArray(followers, maxBlock);
        console.log("Status Blocks: " + JSON.stringify(followersBlocks));

        for (const followerBlock of followersBlocks) { // For each block of followers send a post block to the PostBlock Queue
            await this.sendPostBlockToQ(status, followerBlock);
        }
    }


    //Called by chopStatus to chop the followers into blocks
    chunkArray<T>(array: T[], chunkSize: number): T[][] {
        let results = [];
        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }
        return results;
    }

    // Send a post block to the PostBlock Queue
    async sendPostBlockToQ(status: Status, postBlock: string[]): Promise<void> {
        console.log("PostChopperLambda: sendPostBlock: postBlock: " + JSON.stringify(postBlock));
        // Send postBlock to PostBlock Queue through DAO
        const queuePostRequest: PostBlockRequest = {
            status: status,
            followers: postBlock
        };
        await this.getQueueDAO().sendToPostBlockQ(queuePostRequest);
    }

    // Final main step. What the process Post Block Lambda will call. This will post the status to the followers feeds
    public async processStatuses(status: Status, followers: string[]): Promise<void> {

        console.log("Processing status for followers: " + JSON.stringify(followers));

        for (const follower of followers) {
            // await this.getFeedDAO().postStatus(follower, status);
            //FIXME
        }
    }
}
