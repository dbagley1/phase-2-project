import TweetItemSmall from "./TweetItemSmall.js";

function TweetList(props) {
  const { tweets, editMode } = props;

  return (
    <div>
      {/* <h3>Tweets</h3> */}
      <ul>
        {tweets.map(tweet => <TweetItemSmall key={tweet.id} tweet={tweet} editMode={editMode} />)}
      </ul>
    </div>
  );
}

export default TweetList;
