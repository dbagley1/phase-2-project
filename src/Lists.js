import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddListForm from "./AddListForm";
import { ListsContext } from "./App";

function Lists(props) {
  const { lists } = useContext(ListsContext);

  return (
    <div className="lists-page">
      <h1>Tweet Lists</h1>
      <AddListForm />
      {lists.map((list) => (
        <div className="list-link-wrap" key={list.id}>
          <Link to={`/lists/${list.id}`}>
            <div className="list-link">
              <h2>{list.name}<span style={{ fontWeight: 300 }}> | {list?.tweets?.length || 0} Tweets</span></h2>
              <p></p>
            </div>
          </Link>
        </div>
      ))}
      {/* {JSON.stringify(lists)} */}
    </div>
  );
}

export default Lists;
