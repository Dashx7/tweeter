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
import { User, Status } from "tweeter-shared";
import UseInfoHook from "./components/userInfo/UseInfoHook";
import { FollowingPresenter } from "./presenter/FollowingPresenter";
import { FollowersPresenter } from "./presenter/FollowersPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { PagedItemView } from "./presenter/PagedItemPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = UseInfoHook();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <ItemScroller
              key={"feed"}
              presenterGenerator={(view: PagedItemView<Status>) =>
                new FeedPresenter(view)
              }
              itemComponentGenerator={(value: Status) => (
                <StatusItem item={value} />
              )}
            />
          }
        />
        <Route
          path="story"
          element={
            <ItemScroller
              key={"story"}
              presenterGenerator={(view: PagedItemView<Status>) =>
                new StoryPresenter(view)
              }
              itemComponentGenerator={(value: Status) => (
                <StatusItem item={value} />
              )}
            />
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
              itemComponentGenerator={(value: User) => (
                <UserItem item={value} />
              )}
            />
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
              itemComponentGenerator={(value: User) => (
                <UserItem item={value} />
              )}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
