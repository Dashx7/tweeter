import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import UseInfoHook from "../userInfo/UseInfoHook";
import {
  StatusItemPresenter,
  StatusItemView,
} from "../../presenter/StatusItemPresenter";

export const PAGE_SIZE = 10;

interface Props {
  presenterGenerator: (view: StatusItemView) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastItem, setLastItem] = useState<Status | null>(null);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const itemsReference = useRef(items);
  itemsReference.current = items;

  const addItems = (newItems: Status[]) =>
    setItems([...itemsReference.current, ...newItems]);

  const { displayedUser, authToken } = UseInfoHook();

  // Load initial items
  useEffect(() => {
    presenter.loadMoreItems(authToken!, displayedUser!); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listener: StatusItemView = {
    addItems: (newItems: Status[]) =>
      setItems([...itemsReference.current, ...newItems]),
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState(props.presenterGenerator(listener));

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <StatusItem key={index} item={item} index={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StatusItemScroller;
