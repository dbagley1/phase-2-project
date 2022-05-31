import { async } from "@firebase/util";
import { collection, doc, setDoc, getDocs, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

const tweetsRef = collection(db, "tweets");
const listsRef = collection(db, 'lists');

export const getAllDatabaseTweets = async () => {
  const querySnapshot = await getDocs(tweetsRef);
  const tweets = querySnapshot.docs.map(doc => doc.data());
  console.log('getAllDatabaseTweets', tweets);
  return tweets;
};

export const getDatabaseTweets = async (tweetIDs) => {
  const tweets = await getAllDatabaseTweets();
  const filteredTweets = tweets.filter(tweet => tweetIDs.includes(tweet.id));
  console.log('getDatabaseTweets', filteredTweets);
  return filteredTweets;
};

export const getDatabaseTweet = async (tweetID) => {
  const tweet = await getDoc(doc(db, "tweets", tweetID));
  console.log(tweet);
  return tweet;
};

export const addTweetsToDatabase = async (tweets) => {
  for (let tweet of tweets) {
    await addTweetToDatabase(tweet);
  }
};

export const addTweetToDatabase = async (tweet) => {
  Object.keys(tweet).forEach((key) => {
    if (tweet[key] === null || tweet[key] === undefined) {
      delete tweet[key];
    }
  });
  return await setDoc(doc(db, "tweets", tweet.id), tweet);
};

export const getList = async (listId) => {
  const querySnapshot = await getDoc(doc(db, "lists", listId));
  const list = querySnapshot.data();
  console.log('getList', list);
  return list;
};

export const getAllLists = async () => {
  const querySnapshot = await getDocs(listsRef);
  const lists = querySnapshot.docs.map(doc => { return { "id": doc.id, ...doc.data() }; });
  console.log('getAllLists', lists);
  return lists;
};

export const addListToDatabase = async (list) => {
  const newList = await addDoc(listsRef, list);
  return { id: newList.id, ...list };
};

export const updateDatabaseList = async (list, id) => {
  id ??= list.id;
  const newList = { ...list, tweets: [...new Set(list.tweets)] };
  delete newList.id;
  return await setDoc(doc(db, "lists", id), newList);
};

export const deleteListOnDatabase = async (listId) => {
  return await deleteDoc(doc(db, "lists", listId));
};

export const removeTweetFromDatabase = async (tweetId) => {
  return await deleteDoc(doc(db, "tweets", tweetId));
};
