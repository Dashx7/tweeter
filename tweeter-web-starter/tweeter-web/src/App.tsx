import "./App.css";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfo from "./components/userInfo/UserInfoListenerHook";
import {FollowingPresenter} from "./presenter/FollowingPresenter";
import {FollowersPresenter} from "./presenter/FollowersPresenter";
import {FeedPresenter} from "./presenter/FeedPresenter";
import {StoryPresenter} from "./presenter/StoryPresenter";
import {PagedItemView} from "./presenter/PagedItemPresenter";
import {Status, User} from "tweeter-shared";
import ItemScroller from "./components/mainLayout/ItemScroller";
import UserItem from "./components/userItem/UserItem";
import StatusItem from "./components/statusItem/StatusItem";

const App = () => {
    const {currentUser, authToken} = useUserInfo();

    const isAuthenticated = (): boolean => {
        return !!currentUser && !!authToken;
    };

    return (
        <div>
            <Toaster position="top-right"/>
            <BrowserRouter>
                {isAuthenticated() ? (
                    <AuthenticatedRoutes/>
                ) : (
                    <UnauthenticatedRoutes/>
                )}
            </BrowserRouter>
        </div>
    );
};

const AuthenticatedRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index element={<Navigate to="/feed"/>}/>
                <Route
                    path="feed"
                    element={
                        <ItemScroller
                            key={"feed"}
                            presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)}
                            itemComponentGenerator={(item: Status) => <StatusItem value={item}/>}
                        />
                    }
                />
                <Route
                    path="story"
                    element={
                        <ItemScroller
                            key={"story"}
                            presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)}
                            itemComponentGenerator={(item: Status) => <StatusItem value={item}/>}/>
                    }
                />
                <Route
                    path="following"
                    element={
                        <ItemScroller
                            key={"following"}
                            presenterGenerator={(view: PagedItemView<User>) =>
                                new FollowingPresenter(view)
                            }
                            itemComponentGenerator={(item: User) => <UserItem value={item}/>}/>
                    }
                />
                <Route
                    path="followers"
                    element={
                        <ItemScroller
                            key={"followers"}
                            presenterGenerator={(view: PagedItemView<User>) =>
                                new FollowersPresenter(view)
                            }
                            itemComponentGenerator={(item: User) => <UserItem value={item}/>}/>
                    }
                />
                <Route path="logout" element={<Navigate to="/login"/>}/>
                <Route path="*" element={<Navigate to="/feed"/>}/>
            </Route>
        </Routes>
    );
};

const UnauthenticatedRoutes = () => {
    const location = useLocation();

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Login originalUrl={location.pathname}/>}/>
        </Routes>
    );
};

export default App;
