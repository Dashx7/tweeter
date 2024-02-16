import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import UseInfoHook from "../userInfo/UseInfoHook";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../presenter/PostStatusPresenter";

const PostStatus = () => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();
  const [isPostEmpty, setIsPostEmpty] = useState(true);
  const [postContent, setPostContent] = useState("");

  const listener: PostStatusView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    setIsPostEmpty: setIsPostEmpty,
    setPostContent: setPostContent,
  };

  const [presenter] = useState(new PostStatusPresenter(listener));

  const { currentUser, authToken } = UseInfoHook();

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    presenter.Post = "";
  };

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    presenter.submitPost(currentUser, authToken);
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          rows={10}
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(event) => {
            presenter.Post = event.target.value;
            setPostContent(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          disabled={isPostEmpty || !authToken || !currentUser}
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          disabled={isPostEmpty || !authToken || !currentUser}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
