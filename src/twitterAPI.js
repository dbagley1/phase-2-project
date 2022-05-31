const base = "https://quick-duck-41.deno.dev";

function fetchTweets(tweetIDs) {
  return fetch(`${base}/tweets?ids=${tweetIDs.join('')}&expansions=referenced_tweets.id,attachments.media_keys,referenced_tweets.id.author_id&tweet.fields=id,created_at,text,author_id,referenced_tweets,attachments,public_metrics&user.fields=id,name,username,profile_image_url&media.fields=media_key,type,url,width,public_metrics,alt_text,variants`)
    .then(response => response.json());
}

export const getTweets = async function (tweetIDs) {
  let result = [];

  try {
    const data = await fetchTweets(tweetIDs);

    async function getTweetsAndReferenced(tweetData) {
      const quotedIDs = tweetData?.includes?.tweets?.map(tweet => tweet.id);
      if (quotedIDs) {
        await fetchTweets(quotedIDs).then(quotedTweetData => {
          data.data = [...data.data, ...quotedTweetData.data];
          Object.keys(quotedTweetData.includes).forEach(key => {
            data.includes[key] = [
              ...data.includes[key],
              ...quotedTweetData.includes[key]
            ];
          });
          getTweetsAndReferenced(quotedTweetData);
        });
      }
    }

    await getTweetsAndReferenced(data);

    console.log('getTweets fetch result', data);
    result = parseTweets(data);

    const quoteTweets = data.includes?.tweets;
    if (quoteTweets) {
      const expandedIDs = tweetIDs.split(',').concat(quoteTweets.map(tweet => tweet.id));
      const expandedRes = await fetch(`${base}/tweets?ids=${expandedIDs.join(',')}&expansions=referenced_tweets.id,attachments.media_keys,referenced_tweets.id.author_id&tweet.fields=id,created_at,text,author_id,referenced_tweets,attachments,public_metrics&user.fields=id,name,username,profile_image_url&media.fields=media_key,type,url,width,public_metrics,alt_text,variants`);
      const expandedData = await expandedRes.json();
      console.log('getTweets expanded fetch result', expandedData);
      result = parseTweets(expandedData);
    }
  } catch (e) { console.log(e); }

  console.log('getTweets parsed result', result);
  return result;
};

function parseTweets(tweetData) {
  const { data, includes } = tweetData;

  const parsedTweets = [];

  data.forEach(tweet => {
    const parsedTweet = parseTweet(tweet, includes, data);
    parsedTweets.push(parsedTweet);
  });

  return parsedTweets;
}

function parseTweet(tweet, includes, data) {
  const { id, text, created_at, author_id, attachments, public_metrics, referenced_tweets } = tweet;
  const { media_keys, tweets } = attachments || {};
  const media = includes?.media?.filter(media => media_keys?.includes(media.media_key)) || [];
  const { like_count, retweet_count, reply_count, quote_count } = public_metrics || {};
  const user = includes?.users?.find(user => user.id === author_id) || {};

  let quoteTweet;
  if (referenced_tweets) {
    const refTweet = data.find(tweet => tweet.id === referenced_tweets[0].id) || includes.tweets?.find(tweet => tweet.id === referenced_tweets[0].id);
    quoteTweet = refTweet ? parseTweet(refTweet, includes, data) : null;
  }

  const parsedTweet = {
    id,
    text,
    created_at,
    user,
    media,
    public_metrics,
  };

  if (quoteTweet) {
    parsedTweet.quoteTweet = quoteTweet;
  }

  return parsedTweet;
}
