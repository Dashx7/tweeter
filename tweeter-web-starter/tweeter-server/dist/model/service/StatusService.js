"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const BaseService_1 = require("./BaseService");
const AuthTokenTableDAO_1 = require("../../DAOs/AuthTokenTableDAO");
const maxBlock = 25;
class StatusService extends BaseService_1.BaseService {
    loadMoreFeedItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
        });
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            console.log("Loading more story items");
            console.log("User: " + user.toJson());
            console.log("PageSize: " + pageSize);
            console.log("LastItem: " + lastItem);
            const response = yield this.getStoryDAO().loadMoreStoryItems(user, pageSize, lastItem);
            console.log("Got back response in status service :" + response.toString());
            return response;
        });
    }
    postStatus(authToken, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            yield this.getStoryDAO().postStatus(newStatus); //Post to the story DAO
            yield this.getQueueDAO().sendToOriginalPostQ(newStatus); // First main step. Send the status to the Original Post Queue
            return; // Should run in < 1 second
        });
    }
    ;
    // Second main step. Turn a status into a list of PostBlocks (string lists themselves)
    originalPostChopper(status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Chopping status into blocks");
            if (status == null) {
                throw new Error("Status is undefined");
            }
            console.log("Status: " + JSON.stringify(status));
            if (status.user == null) {
                throw new Error("User is undefined");
            }
            const [followers] = yield this.getFollowDAO().loadMoreFollowers(status.user, 100, null); // Get the followers of the user
            console.log("Followers: " + followers);
            const followersBlocks = this.chunkArray(followers, maxBlock);
            console.log("Status Blocks: " + JSON.stringify(followersBlocks));
            for (const followerBlock of followersBlocks) { // For each block of followers send a post block to the PostBlock Queue
                yield this.sendPostBlockToQ(status, followerBlock);
            }
        });
    }
    //Called by chopStatus to chop the followers into blocks
    chunkArray(array, chunkSize) {
        let results = [];
        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }
        return results;
    }
    // Send a post block to the PostBlock Queue
    sendPostBlockToQ(status, postBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PostChopperLambda: sendPostBlock: postBlock: " + JSON.stringify(postBlock));
            // Send postBlock to PostBlock Queue through DAO
            const queuePostRequest = {
                status: status,
                followers: postBlock
            };
            yield this.getQueueDAO().sendToPostBlockQ(queuePostRequest);
        });
    }
    // Final main step. What the process Post Block Lambda will call. This will post the status to the followers feeds
    processStatuses(status, followers) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Processing status for followers: " + JSON.stringify(followers));
            for (const follower of followers) {
                // await this.getFeedDAO().postStatus(follower, status);
                //FIXME
            }
        });
    }
}
exports.StatusService = StatusService;
