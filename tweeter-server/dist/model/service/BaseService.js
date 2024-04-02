"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
//Has all the DAOS
const DAOFactories_1 = require("../../DAOs/DAOFactories");
//public DAO
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
    getStatusDAO() {
        return this.DAOFactory.getStatusDAO();
    }
}
exports.BaseService = BaseService;
