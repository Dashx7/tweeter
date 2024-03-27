import "./UserInfo.css";
import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import {
  UserInfoPresenter,
  UserInfoView,
} from "../../presenter/UserInfoPresenter";
import UseInfoHook from "./UseInfoHook";

const UserInfo = () => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken, displayedUser, setDisplayedUser } =
    UseInfoHook();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (!displayedUser) {
    setDisplayedUser(currentUser!);
  }

  const listener: UserInfoView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    infoChanged: () => {
      forceUpdate();
    },
  };

  const [presenter] = useState(new UserInfoPresenter(listener));
  useEffect(() => {
    presenter.updateUserInformation(authToken!, currentUser!, displayedUser!);
  }, [displayedUser]);

  const switchToLoggedInUser = (event: React.MouseEvent): void => {
    event.preventDefault();
    setDisplayedUser(currentUser!);
  };

  const followDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();

    await presenter.followDisplayedUser(authToken!, displayedUser!);
  };

  const unfollowDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();

    await presenter.unfollowDisplayedUser(authToken!, displayedUser!);
  };

  return (
    <>
      {currentUser === null || displayedUser === null || authToken === null ? (
        <></>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-auto p-3">
              <img
                src={displayedUser.imageUrl}
                className="img-fluid"
                width="100"
                alt="Posting user"
              />
            </div>
            <div className="col p-3">
              {displayedUser !== currentUser && (
                <p id="returnToLoggedInUser">
                  Return to{" "}
                  <Link
                    to={""}
                    onClick={(event) => switchToLoggedInUser(event)}
                  >
                    logged in user
                  </Link>
                </p>
              )}
              <h2>
                <b>{displayedUser.name}</b>
              </h2>
              <h3>{displayedUser.alias}</h3>
              <br />
              {presenter.followeesCount > -1 &&
                presenter.followersCount > -1 && (
                  <div>
                    Following: {presenter.followeesCount} Followers:{" "}
                    {presenter.followersCount}
                  </div>
                )}
            </div>
            <form>
              {displayedUser !== currentUser && (
                <div className="form-group">
                  {presenter.isFollower ? (
                    <button
                      id="unFollowButton"
                      className="btn btn-md btn-secondary me-1"
                      type="submit"
                      onClick={(event) => unfollowDisplayedUser(event)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      id="followButton"
                      className="btn btn-md btn-primary me-1"
                      type="submit"
                      onClick={(event) => followDisplayedUser(event)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;

// import "./UserInfo.css";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useToastListener from "../toaster/ToastListenerHook";
// import UseInfoHook from "./UseInfoHook";
// import {
//   UserInfoPresenter,
//   UserInfoView,
// } from "../../presenter/UserInfoPresenter";

// const UserInfo = () => {
//   const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
//     useToastListener();

//   const { currentUser, authToken, displayedUser, setDisplayedUser } =
//     UseInfoHook();

//   if (!displayedUser) {
//     setDisplayedUser(currentUser!);
//     console.log("UserInfo displayedUser swtiched to: ", displayedUser);
//   }

//   const listener: UserInfoView = {
//     displayErrorMessage: displayErrorMessage,
//     displayInfoMessage: displayInfoMessage,
//     clearLastInfoMessage: clearLastInfoMessage,
//   };

//   const [presenter] = useState(new UserInfoPresenter(listener));

//   useEffect(() => {
//     presenter.setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
//     presenter.setNumbFollowees(authToken!, displayedUser!);
//     presenter.setNumbFollowers(authToken!, displayedUser!);
//   });

//   const switchToLoggedInUser = (event: React.MouseEvent): void => {
//     event.preventDefault();
//     setDisplayedUser(currentUser!);
//   };

//   const followDisplayedUser = async (
//     event: React.MouseEvent
//   ): Promise<void> => {
//     console.log("followDisplayedUser curentUser: ", currentUser);
//     event.preventDefault();
//     await presenter.followDisplayedUser(displayedUser!, authToken!);
//   };

//   const unfollowDisplayedUser = async (
//     event: React.MouseEvent
//   ): Promise<void> => {
//     console.log("unfollowDisplayedUser curentUser: ", currentUser);
//     event.preventDefault();
//     await presenter.unfollowDisplayedUser(displayedUser!, authToken!);
//   };

//   return (
//     <>
//       {currentUser === null || displayedUser === null || authToken === null ? (
//         <></>
//       ) : (
//         <div className="container">
//           <div className="row">
//             <div className="col-auto p-3">
//               <img
//                 src={displayedUser.imageUrl}
//                 className="img-fluid"
//                 width="100"
//                 alt="Posting user"
//               />
//             </div>
//             <div className="col p-3">
//               {displayedUser !== currentUser && (
//                 <p id="returnToLoggedInUser">
//                   Return to{" "}
//                   <Link
//                     to={""}
//                     onClick={(event) => switchToLoggedInUser(event)}
//                   >
//                     logged in user
//                   </Link>
//                 </p>
//               )}
//               <h2>
//                 <b>{displayedUser.name}</b>
//               </h2>
//               <h3>{displayedUser.alias}</h3>
//               <br />
//               {presenter.FolloweesCount > -1 &&
//                 presenter.FollowersCount > -1 && (
//                   <div>
//                     Following: {presenter.FolloweesCount} Followers:{" "}
//                     {presenter.FollowersCount}
//                   </div>
//                 )}
//             </div>
//             <form>
//               {displayedUser !== currentUser && (
//                 <div className="form-group">
//                   {presenter.IsFollowerStatus ? (
//                     <button
//                       id="unFollowButton"
//                       className="btn btn-md btn-secondary me-1"
//                       type="submit"
//                       onClick={(event) => unfollowDisplayedUser(event)}
//                     >
//                       Unfollow
//                     </button>
//                   ) : (
//                     <button
//                       id="followButton"
//                       className="btn btn-md btn-primary me-1"
//                       type="submit"
//                       onClick={(event) => followDisplayedUser(event)}
//                     >
//                       Follow
//                     </button>
//                   )}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
//
// export default UserInfo;

// import "./UserInfo.css";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useToastListener from "../toaster/ToastListenerHook";
// import UseInfoHook from "./UseInfoHook";
// import {
//   UserInfoPresenter,
//   UserInfoView,
// } from "../../presenter/UserInfoPresenter";

// const UserInfo = () => {
//   const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
//     useToastListener();

//   const { currentUser, authToken, displayedUser, setDisplayedUser } =
//     UseInfoHook();
//   if (!displayedUser) {
//     setDisplayedUser(currentUser!);
//   }

//   const listener: UserInfoView = {
//     displayErrorMessage: displayErrorMessage,
//     displayInfoMessage: displayInfoMessage,
//     clearLastInfoMessage: clearLastInfoMessage,
//   };

//   const [presenter] = useState(new UserInfoPresenter(listener));

//   useEffect(() => {
//     presenter.setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
//     presenter.setNumbFollowees(authToken!, displayedUser!);
//     presenter.setNumbFollowers(authToken!, displayedUser!);
//   });

//   const switchToLoggedInUser = (event: React.MouseEvent): void => {
//     event.preventDefault();
//     setDisplayedUser(currentUser!);
//   };

//   const followDisplayedUser = async (
//     event: React.MouseEvent
//   ): Promise<void> => {
//     event.preventDefault();
//     await presenter.followDisplayedUser(authToken!, currentUser!!);
//   };

//   const unfollowDisplayedUser = async (
//     event: React.MouseEvent
//   ): Promise<void> => {
//     event.preventDefault();
//     await presenter.unfollowDisplayedUser(authToken!, currentUser!!);
//   };

//   return (
//     <>
//       {currentUser === null || displayedUser === null || authToken === null ? (
//         <></>
//       ) : (
//         <div className="container">
//           <div className="row">
//             <div className="col-auto p-3">
//               <img
//                 src={displayedUser.imageUrl}
//                 className="img-fluid"
//                 width="100"
//                 alt="Posting user"
//               />
//             </div>
//             <div className="col p-3">
//               {displayedUser !== currentUser && (
//                 <p id="returnToLoggedInUser">
//                   Return to{" "}
//                   <Link
//                     to={""}
//                     onClick={(event) => switchToLoggedInUser(event)}
//                   >
//                     logged in user
//                   </Link>
//                 </p>
//               )}
//               <h2>
//                 <b>{displayedUser.name}</b>
//               </h2>
//               <h3>{displayedUser.alias}</h3>
//               <br />
//               {presenter.FollowerCount > -1 && presenter.FollowerCount > -1 && (
//                 <div>
//                   Following: {presenter.FolloweeCount} Followers:{" "}
//                   {presenter.FollowerCount}
//                 </div>
//               )}
//             </div>
//             <form>
//               {displayedUser !== currentUser && (
//                 <div className="form-group">
//                   {presenter.IsFollower ? (
//                     <button
//                       id="unFollowButton"
//                       className="btn btn-md btn-secondary me-1"
//                       type="submit"
//                       onClick={(event) => unfollowDisplayedUser(event)}
//                     >
//                       Unfollow
//                     </button>
//                   ) : (
//                     <button
//                       id="followButton"
//                       className="btn btn-md btn-primary me-1"
//                       type="submit"
//                       onClick={(event) => followDisplayedUser(event)}
//                     >
//                       Follow
//                     </button>
//                   )}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserInfo;
