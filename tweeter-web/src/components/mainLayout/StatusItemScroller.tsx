import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import UseInfoHook from "../userInfo/UseInfoHook";

export const PAGE_SIZE = 10;

interface Props {
  itemDescription: string; //Feed or Story
  loadMoreStatusItems: (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ) => Promise<[Status[], boolean]>;
  //This is a function that takes in an AuthToken, a User, a number, and a Status and returns a Promise of an array of Statuses and a boolean
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
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type LoadFunctionType<T> = (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: T | null
  ) => Promise<[T[], boolean]>;

  const loadMoreItems = async () => {
    try {
      if (hasMoreItems) {
        let [newItems, hasMore] = await props.loadMoreStatusItems(
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          lastItem
        );

        setHasMoreItems(hasMore);
        setLastItem(newItems[newItems.length - 1]);
        addItems(newItems);
      }
    } catch (error) {
      displayErrorMessage(
        `Failed to load ${props.itemDescription} items because of exception: ${error}`
      );
    }
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
