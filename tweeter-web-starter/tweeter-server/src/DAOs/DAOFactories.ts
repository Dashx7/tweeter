import { UserTableDAO } from "./UserTableDAO";
import { FollowTableDAO } from "./FollowTableDAO";
import { AuthTokenTableDAO } from "./AuthTokenTableDAO";
import { FeedTableDAO } from "./FeedTableDAO";
import { StoryTableDAO } from "./StoryTableDAO";
import { QueueDAO } from "./QueueDAO";

//Start of DAOFactories
export interface DAOFactoryInterface {
    getUserDAO(): UserTableDAO;
    getFollowDAO(): FollowTableDAO;
    getAuthTokenDAO(): AuthTokenTableDAO;
    getFeedDAO(): FeedTableDAO;
    getStoryDAO(): StoryTableDAO;
    getQueueDAO(): QueueDAO;
}

export class ConcreteDAOFactory implements DAOFactoryInterface {
    private userDAO: UserTableDAO | null = null;
    private followDAO: FollowTableDAO | null = null;
    private authTokenDAO: AuthTokenTableDAO | null = null;
    private feedDAO: FeedTableDAO | null = null;
    private storyDAO: StoryTableDAO | null = null;
    private queueDAO: QueueDAO | null = null;

    getUserDAO(): UserTableDAO {
        if (!this.userDAO) {
            this.userDAO = new UserTableDAO();
        }
        return this.userDAO;
    }

    getFollowDAO(): FollowTableDAO {
        if (!this.followDAO) {
            this.followDAO = new FollowTableDAO();
        }
        return this.followDAO;
    }

    getAuthTokenDAO(): AuthTokenTableDAO {
        if (!this.authTokenDAO) {
            this.authTokenDAO = new AuthTokenTableDAO();
        }
        return this.authTokenDAO;
    }

    getFeedDAO(): FeedTableDAO {
        if (!this.feedDAO) {
            this.feedDAO = new FeedTableDAO();
        }
        return this.feedDAO;
    }

    getStoryDAO(): StoryTableDAO {
        if (!this.storyDAO) {
            this.storyDAO = new StoryTableDAO();
        }
        return this.storyDAO;
    }

    getQueueDAO(): QueueDAO {
        if (!this.queueDAO) {
            this.queueDAO = new QueueDAO();
        }
        return this.queueDAO;
    }
}

