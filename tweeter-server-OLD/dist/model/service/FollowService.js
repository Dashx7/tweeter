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
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const BaseService_1 = require("./BaseService");
class FollowService {
    constructor() {
        //private DAO
        this.followDAO = new BaseService_1.BaseService().getFollowDAO();
    }
    loadMoreFollowers(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
        });
    }
    ;
    loadMoreFollowees(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
        });
    }
    ;
    getIsFollowerStatus(authToken, user, selectedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.isFollower();
        });
    }
    ;
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getFolloweesCount(user);
        });
    }
    ;
    getFollowersCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getFollowersCount(user);
            // return this.followDAO.getFollowersCount(authToken, user);
        });
    }
    ;
    follow(authToken, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pause so we can see the following message. Remove when connected to the server
            console.log("1.1");
            yield new Promise((f) => setTimeout(f, 2000));
            console.log("1.2");
            // TODO: Call the server
            let followersCountTemp = yield this.getFollowersCount(authToken, userToFollow);
            let followeesCountTemp = yield this.getFolloweesCount(authToken, userToFollow);
            return [followersCountTemp, followeesCountTemp];
        });
    }
    ;
    unfollow(authToken, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("1.1");
            // Pause so we can see the unfollowing message. Remove when connected to the server
            yield new Promise((f) => setTimeout(f, 2000));
            console.log("1.2");
            // TODO: Call the server
            let followersCountTemp = yield this.getFollowersCount(authToken, userToUnfollow);
            let followeesCountTemp = yield this.getFolloweesCount(authToken, userToUnfollow);
            return [followersCountTemp, followeesCountTemp];
        });
    }
    ;
}
exports.FollowService = FollowService;
