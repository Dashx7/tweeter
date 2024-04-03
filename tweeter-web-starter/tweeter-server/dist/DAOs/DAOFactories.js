"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteDAOFactory = void 0;
const UserTableDAO_1 = require("./UserTableDAO");
const FollowTableDAO_1 = require("./FollowTableDAO");
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
const FeedTableDAO_1 = require("./FeedTableDAO");
const StoryTableDAO_1 = require("./StoryTableDAO");
class ConcreteDAOFactory {
    getUserDAO() {
        return new UserTableDAO_1.UserTableDAO();
    }
    getFollowDAO() {
        return new FollowTableDAO_1.FollowTableDAO();
    }
    getAuthTokenDAO() {
        return new AuthTokenTableDAO_1.AuthTokenTableDAO();
    }
    getFeedDAO() {
        return new FeedTableDAO_1.FeedTableDAO();
    }
    getStoryDAO() {
        return new StoryTableDAO_1.StoryTableDAO();
    }
}
exports.ConcreteDAOFactory = ConcreteDAOFactory;
