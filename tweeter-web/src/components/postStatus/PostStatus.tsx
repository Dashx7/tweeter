import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import UseInfoHook from "../userInfo/UseInfoHook";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../presenter/PostStatusPresenter";

interface Props {
  presenter?: PostStatusPresenter;
}

const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();
  const [postContent, setPostContent] = useState("");

  const checkButtonStatus: () => boolean = () => {
    return !postContent.trim() || !authToken || !currentUser; // If the post content is empty or the user is not logged in, the button should be disabled
  };

  const listener: PostStatusView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    setPostContent: setPostContent,
  };

  const [presenter] = useState(
    props.presenter ?? new PostStatusPresenter(listener)
  );

  const { currentUser, authToken } = UseInfoHook();

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    setPostContent("");
  };

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    presenter.submitPost(currentUser, authToken, postContent);
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
          aria-label="textbox"
          onChange={(event) => {
            setPostContent(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          disabled={checkButtonStatus()}
          aria-label="submitButton"
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          disabled={checkButtonStatus()}
          aria-label="clearButton"
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
