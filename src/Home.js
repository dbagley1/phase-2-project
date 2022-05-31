import { createContext, useContext, useEffect, useState } from "react";
import { addTweetsToDatabase, getAllDatabaseTweets, removeTweetFromDatabase } from "./databaseAPI";
import AddTweetForm from "./AddTweetForm";
import TweetList from "./TweetList";
import { getTweets } from "./twitterAPI";

export const TweetContext = createContext();


function Home() {
  const { tweets } = useContext(TweetContext);

  return (
    <div className="home-page">
      <h1>All Tweets</h1>
      <AddTweetForm />
      <TweetList tweets={tweets} />
      {/* <div>{JSON.stringify(tweets)}</div> */}
    </div>
  );
}

export default Home;
