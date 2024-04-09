//Has all the DAOS
import { AuthToken } from "tweeter-shared";
import { ConcreteDAOFactory } from "../../DAOs/DAOFactories";

//public DAO

export class BaseService {
    public DAOFactory: ConcreteDAOFactory = new ConcreteDAOFactory();

    public getUserDAO() {
        return this.DAOFactory.getUserDAO();
    }
    public getFollowDAO() {
        return this.DAOFactory.getFollowDAO();
    }
    public getAuthTokenDAO() {
        return this.DAOFactory.getAuthTokenDAO();
    }
    public getFeedDAO() {
        return this.DAOFactory.getFeedDAO();
    }
    public getStoryDAO() {
        return this.DAOFactory.getStoryDAO();
    }
}