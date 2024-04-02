//Has all the DAOS
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
    public getStatusDAO() {
        return this.DAOFactory.getStatusDAO();
    }
}