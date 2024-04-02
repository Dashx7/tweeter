"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteDAOFactory = void 0;
const UserTableDAO_1 = require("./UserTableDAO");
const FollowTableDAO_1 = require("./FollowTableDAO");
const AuthTokenTableDAO_1 = require("./AuthTokenTableDAO");
const StatusTableDAO_1 = require("./StatusTableDAO");
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
    getStatusDAO() {
        return new StatusTableDAO_1.StatusTableDAO();
    }
}
exports.ConcreteDAOFactory = ConcreteDAOFactory;
