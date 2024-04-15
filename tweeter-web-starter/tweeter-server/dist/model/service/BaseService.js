"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const DAOFactories_1 = require("../../DAOs/DAOFactories");
//public DAO
//This would be a way to not use Dyanmo DB, and replace the conretaiton take a variable to be able to switch between the two
class BaseService {
    constructor() {
        this.DAOFactory = new DAOFactories_1.ConcreteDAOFactory();
    }
    getUserDAO() {
        return this.DAOFactory.getUserDAO();
    }
    getFollowDAO() {
        return this.DAOFactory.getFollowDAO();
    }
    getAuthTokenDAO() {
        return this.DAOFactory.getAuthTokenDAO();
    }
    getFeedDAO() {
        return this.DAOFactory.getFeedDAO();
    }
    getStoryDAO() {
        return this.DAOFactory.getStoryDAO();
    }
    getQueueDAO() {
        return this.DAOFactory.getQueueDAO();
    }
}
exports.BaseService = BaseService;
