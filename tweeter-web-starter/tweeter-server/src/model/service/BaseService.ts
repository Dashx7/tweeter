import { ConcreteDAOFactory, DAOFactoryInterface } from "../../DAOs/DAOFactories";

//public DAO
//This would be a way to not use Dyanmo DB, and replace the conretaiton take a variable to be able to switch between the two
export class BaseService {
    public DAOFactory: DAOFactoryInterface = new ConcreteDAOFactory();

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
    public getQueueDAO() {
        return this.DAOFactory.getQueueDAO();
    }
}