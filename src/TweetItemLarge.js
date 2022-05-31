import moment from "moment";
import { LikeIcon, ReplyIcon, RetweetIcon } from "./TwitterIcons";

function TweetItemLarge(props) {
  const { tweet } = props;
  const { id, author_id, text, created_at, user, media, public_metrics } = tweet;
  const { name, username, profile_image_url } = user;
  const { retweet_count, like_count, reply_count, quote_count } = public_metrics;

  const parsedText = text.replace(/https:\/\/t\.co\/[^\s]+/g, '');

  return (
    <div className="tweet tweet-large">
      <div className="tweet-user">
        <img className="profile-pic" src={profile_image_url} alt={name} />
        <div>
          <div className="screen-name"><span>{name}</span></div>
          <div className="username"><span>@{username}</span></div>
        </div>
      </div>
      <div className="tweet-content">
        <span>{parsedText}</span>
      </div>
      <div className="tweet-media">
        {media.map((media, index) => (
          <div key={media.media_key} className="tweet-img"><img src={media.url} alt="tweet media" /></div>
        ))}
      </div>
      <div className="tweet-metadata">
        <div className="created-at">
          <span>{moment(tweet.created_at).format('h:mm a · MMM D, YYYY')}</span>
        </div>
      </div>
      <div className="tweet-metrics">
        <div className="tweet-metrics-item">
          <RetweetIcon />
          <span className="tweet-metrics-item-value">{retweet_count}</span>
          <span className="tweet-metrics-item-label">Retweets</span>
        </div>
        <div className="tweet-metrics-item">
          <LikeIcon />
          <span className="tweet-metrics-item-value">{like_count}</span>
          <span className="tweet-metrics-item-label">Likes</span>
        </div>
        <div className="tweet-metrics-item">
          <ReplyIcon />
          <span className="tweet-metrics-item-value">{reply_count}</span>
          <span className="tweet-metrics-item-label">Replies</span>
        </div>
      </div>
    </div>
  );
}

export default TweetItemLarge;
