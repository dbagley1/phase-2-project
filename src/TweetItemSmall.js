import moment from "moment";
import { useContext, useState } from "react";
import { ModalContext } from "./App";
import { TweetContext } from "./Home";
import { DeleteIcon, LikeIcon, LinkIcon, ReplyIcon, RetweetIcon } from "./TwitterIcons";

function TweetItemSmall(props) {
  const { tweet, editMode } = props;
  const { id, author_id, text, created_at, user, media, public_metrics, quoteTweet } = tweet;
  const { name, username, profile_image_url } = { ...user };
  const { retweet_count, like_count, reply_count, quote_count } = { ...public_metrics };
  const isQuoteTweet = props.isQuoteTweet || false;

  const [tweetURL, setTweetURL] = useState(`https://www.twitter.com/${username}/status/${id}`);

  const parsedText = text?.replace(/https:\/\/t\.co\/[^\s]+/g, '');


  const { removeTweet } = useContext(TweetContext);
  const onRemoveTweet = removeTweet;


  function handleRemoveTweet() {
    onRemoveTweet(id);
  }

  const { setModalOpen, setModalSlides, setModalSlideNumber } = useContext(ModalContext);

  function showModalImages(media, index) {
    setModalSlides(media);
    setModalSlideNumber(index);
    setModalOpen(true);
  }

  return (
    <div className="tweet tweet-small">
      {!isQuoteTweet && <div className="profile-pic-col">
        <a href={`https://www.twitter.com/${username}`} target="_blank">
          <img className="profile-pic" src={profile_image_url} alt={name} />
        </a>
      </div>}
      <div className="content-col">
        <div className="tweet-user">
          {isQuoteTweet && <a href={`https://www.twitter.com/${username}`} target="_blank">
            <img className="profile-pic" src={profile_image_url} alt={name} />
          </a>}
          <div className="screen-name"><a href={`https://www.twitter.com/${username}`} target="_blank"><span>{name}</span></a></div>
          <div className="username"><a href={`https://www.twitter.com/${username}`} target="_blank"><span>@{username}</span></a></div>
          <div className="divider">•</div>
          <div className="created-at">
            <span><a href={tweetURL} target="_blank">{moment(tweet.created_at).format('MMM D, YYYY')}</a></span>
          </div>
          {editMode && (<><div className="divider">•</div>
            <span className="remove-btn" onClick={handleRemoveTweet}>remove from list</span></>)}
        </div>
        <div className="tweet-content">
          <span>{parsedText}</span>
          {quoteTweet && (<div key={quoteTweet.id}>
            <TweetItemSmall tweet={quoteTweet} isQuoteTweet={true} />
            {/* JSON.stringify(quoteTweet) */}</div>)}
        </div>
        {media?.length > 0 && (
          <div className="tweet-media">
            {media.map((mediaItem, i) => (
              <div key={mediaItem.media_key} className="tweet-img" onClick={() => showModalImages(media, i)}>
                <img src={mediaItem.url} alt="tweet media" />
              </div>
            ))}
          </div>
        )}
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
          <a className="tweet-metrics-item" href={tweetURL} target="_blank">
            <LinkIcon />
            <span className="tweet-metrics-item-label">View</span>
          </a>
          {!isQuoteTweet && (
            <div className="tweet-metrics-item" onClick={handleRemoveTweet}>
              <DeleteIcon />
              <span className="tweet-metrics-item-label">Delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TweetItemSmall;
