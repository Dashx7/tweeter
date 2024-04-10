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
const AuthTokenTableDAO_1 = require("../../DAOs/AuthTokenTableDAO");
class FollowService extends BaseService_1.BaseService {
    loadMoreFollowers(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            AuthTokenTableDAO_1.AuthTokenTableDAO.authenticate(authToken);
            return tweeter_shared_1.FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
        });
    }
    loadMoreFollowees(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            return tweeter_shared_1.FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
        });
    }
    getIsFollowerStatus(authToken, user, selectedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getFollowDAO().getIsFollowerStatus(authToken, user, selectedUser);
        });
    }
    ;
    getFolloweesCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUserDAO().getFolloweesCount(authToken, user);
        });
    }
    ;
    getFollowersCount(authToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUserDAO().getFollowersCount(authToken, user);
        });
    }
    ;
    follow(authToken, userToFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            const aliasOfFollower = yield this.getFollowDAO().follow(authToken, userToFollow);
            console.log("Attempting to update follower and followee count");
            this.getUserDAO().follow(aliasOfFollower, userToFollow.alias);
            const followersCount = yield this.getUserDAO().getFollowersCount(authToken, userToFollow);
            const followeesCount = yield this.getUserDAO().getFolloweesCount(authToken, userToFollow);
            return [followersCount, followeesCount];
        });
    }
    ;
    unfollow(authToken, userToUnfollow) {
        return __awaiter(this, void 0, void 0, function* () {
            const aliasOfFollower = yield this.getFollowDAO().unfollow(authToken, userToUnfollow);
            this.getUserDAO().unfollow(aliasOfFollower, userToUnfollow.alias);
            const followersCount = yield this.getUserDAO().getFollowersCount(authToken, userToUnfollow);
            const followeesCount = yield this.getUserDAO().getFolloweesCount(authToken, userToUnfollow);
            return [followersCount, followeesCount];
        });
    }
    ;
}
exports.FollowService = FollowService;
