import { UserTableDAO } from "./UserTableDAO";
import { FollowTableDAO } from "./FollowTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";
import { FeedTableDAO } from "./FeedTableDAO";
import { StoryTableDAO } from "./StoryTableDAO";

//Start of DAOFactories
interface DAOFactoryInterface {
    getUserDAO(): UserTableDAO;
    getFollowDAO(): FollowTableDAO;
    getAuthTokenDAO(): AuthTokenTableDAO;
    getFeedDAO(): FeedTableDAO;
    getStoryDAO(): StoryTableDAO;
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
    getFeedDAO(): FeedTableDAO {
        return new FeedTableDAO();
    }
    getStoryDAO(): StoryTableDAO {
        return new StoryTableDAO();
    }
}

