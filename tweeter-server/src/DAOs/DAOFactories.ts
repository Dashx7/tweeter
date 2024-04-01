import { UserTableDAO } from "./UserTableDAO";
import { FollowTableDAO } from "./FollowTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";
import { StatusTableDAO } from "./StatusTableDAO";

//Start of DAOFactories
interface DAOFactoryInterface {
    getUserDAO(): UserTableDAO;
    getFollowDAO(): FollowTableDAO;
    getAuthTokenDAO(): AuthTokenTableDAO;
    getStatusDAO(): StatusTableDAO;
}

export class ConcreteDAOFactory implements DAOFactoryInterface {
    getUserDAO(): UserTableDAO {
        return new UserTableDAO();
    }
    getFollowDAO(): FollowTableDAO {
        return new FollowTableDAO();
    }
    getAuthTokenDAO(): AuthTokenTableDAO {
        return new AuthTokenTableDAO();
    }
    getStatusDAO(): StatusTableDAO {
        return new StatusTableDAO();
    }

}

