import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListsContext } from "./App";
import { updateDatabaseList, getDatabaseTweets, getList } from "./databaseAPI";
import AddTweetForm from "./AddTweetForm";
import { TweetContext } from "./Home";
import TweetItemSmall from "./TweetItemSmall";
import TweetList from "./TweetList";

function List() {
  const { tweets } = useContext(TweetContext);
  const { lists, setLists } = useContext(ListsContext);

  let params = useParams();
  let { listId } = params;
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    console.log('<List>:useEffect', lists, list, listId, tweets);
    if (lists.length) {
      setList(lists.find(list => list.id === listId));
      setFilteredTweets(tweets.filter(tweet => list?.tweets?.includes(tweet.id)));
    }
  }, [lists, list, listId, tweets]);

  return (
    <div>
      <div className="list-header">
        <h1>{list.name || 'List Not Found'}<span style={{ fontWeight: 300 }}> | {list?.tweets?.length || 0} Tweets</span></h1>
      </div>
      <AddTweetForm listInput={listId} />
      {filteredTweets?.length && <TweetList tweets={filteredTweets} />}
      {/* {JSON.stringify(list)} */}
    </div>
  );
}

export default List;
