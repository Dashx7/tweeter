"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteDAOFactory = void 0;
const UserTableDAO_1 = require("./UserTableDAO");
const FollowTableDAO_1 = require("./FollowTableDAO");
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
const FeedTableDAO_1 = require("./FeedTableDAO");
const StoryTableDAO_1 = require("./StoryTableDAO");
const QueueDAO_1 = require("./QueueDAO");
class ConcreteDAOFactory {
    constructor() {
        this.userDAO = null;
        this.followDAO = null;
        this.authTokenDAO = null;
        this.feedDAO = null;
        this.storyDAO = null;
        this.queueDAO = null;
    }
    getUserDAO() {
        if (!this.userDAO) {
            this.userDAO = new UserTableDAO_1.UserTableDAO();
        }
        return this.userDAO;
    }
    getFollowDAO() {
        if (!this.followDAO) {
            this.followDAO = new FollowTableDAO_1.FollowTableDAO();
        }
        return this.followDAO;
    }
    getAuthTokenDAO() {
        if (!this.authTokenDAO) {
            this.authTokenDAO = new AuthTokenTableDAO_1.AuthTokenTableDAO();
        }
        return this.authTokenDAO;
    }
    getFeedDAO() {
        if (!this.feedDAO) {
            this.feedDAO = new FeedTableDAO_1.FeedTableDAO();
        }
        return this.feedDAO;
    }
    getStoryDAO() {
        if (!this.storyDAO) {
            this.storyDAO = new StoryTableDAO_1.StoryTableDAO();
        }
        return this.storyDAO;
    }
    getQueueDAO() {
        if (!this.queueDAO) {
            this.queueDAO = new QueueDAO_1.QueueDAO();
        }
        return this.queueDAO;
    }
}
exports.ConcreteDAOFactory = ConcreteDAOFactory;
