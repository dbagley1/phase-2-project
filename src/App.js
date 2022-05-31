import './App.css';
import { Routes, Route } from "react-router-dom";
import Home, { TweetContext } from "./Home.js";
import List from './List';
import Lists from './Lists';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Modal from './Modal';
import { createContext, useContext, useEffect, useState } from 'react';
import { addListToDatabase, addTweetsToDatabase, getAllDatabaseTweets, getAllLists, removeTweetFromDatabase, updateDatabaseList } from "./databaseAPI";
import { getTweets } from './twitterAPI';

export const ModalContext = createContext(null);
export const ListsContext = createContext(null);

function App() {
  const [modalContent, setModalContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSlides, setModalSlides] = useState([]);
  const [modalSlideNumber, setModalSlideNumber] = useState(0);

  const [lists, setLists] = useState([]);
  const [tweets, setTweets] = useState([]);

  // Get All Lists
  useEffect(() => {
    const fetchLists = async () => {
      const lists = await getAllLists();
      console.log(lists);
      setLists(lists);
    };
    fetchLists();
  }, []);


  // Get All Tweets  
  useEffect(() => {
    getAllDatabaseTweets().then(tweets => setTweets(tweets));
  }, []);

  // Add Tweets
  async function addTweets(ids, listId) {
    const newTweets = await getTweets(ids);
    console.log('addTweets', newTweets);
    setTweets([...newTweets, ...tweets]);
    addTweetsToDatabase(newTweets);

    if (listId) {
      const list = lists.find(list => list.id === listId);
      list.tweets = [...list.tweets, ...ids];
      updateDatabaseList(list, listId);
      setLists([...lists]);
    }
  }

  // Remove Tweet by ID
  async function removeTweet(id) {
    const newTweets = tweets.filter((tweet) => tweet.id !== id);
    console.log('removeTweets', id);
    await removeTweetFromDatabase(id);
    setTweets(newTweets);
    lists.filter(list => list.tweets.includes(id)).forEach(async list => {
      const newListTweets = list.tweets.filter(tweet => tweet !== id);
      list.tweets = newListTweets;
      await updateDatabaseList(list, list.id);
      setLists(lists);
    });
  }

  async function createList(name) {
    console.log('createList', name);
    const newList = await addListToDatabase({ name, tweets: [] });
    setLists([...lists, newList]);
  }

  return (
    <div className="app">
      {/* App */}
      {/* <NavBar /> */}
      <SideBar />
      <ModalContext.Provider value={{ modalOpen, modalContent, modalSlides, modalSlideNumber, setModalSlides, setModalOpen, setModalContent, setModalSlideNumber }}>
        <TweetContext.Provider value={{ tweets, addTweets, removeTweet }}>
          <ListsContext.Provider value={{ lists, setLists, createList }}>
            <Modal />
            <div className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lists/" element={<Lists />} />
                <Route path="/lists/:listId" element={<List />} />
              </Routes>
            </div>
          </ListsContext.Provider>
        </TweetContext.Provider>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
