import { useContext, useState } from 'react';
import { ListsContext } from './App';
import { TweetContext } from './Home';

function AddTweetForm(props) {
  const [listInput, setListInput] = useState(props.listInput);
  const [idInput, setIdInput] = useState('20');
  const [submitted, setSubmitted] = useState(false);
  const { tweets } = useContext(TweetContext);

  const { addTweets } = useContext(TweetContext);
  const { lists } = useContext(ListsContext);

  const onFormSubmit = addTweets;

  function handleSubmit(e) {
    e.preventDefault();
    let parseIDUrls = [...idInput.matchAll(/status\/(\d+)/g)].map(x => x[1]);
    let parseIDList = [...idInput.matchAll(/\d+/g)].map(match => match[0]);

    let idList = parseIDUrls.length > 0 ? parseIDUrls : parseIDList;

    console.log('parseIds', idList);
    if (idList.length > 0) {
      onFormSubmit(idList, listInput);
      setSubmitted(true);
    } else {
      alert('Please enter a valid Tweet ID');
      setSubmitted(false);
    }
  }

  function handleInputChange(e) {
    setIdInput(e.target.value);
    setSubmitted(false);
  }

  function handleSelectChange(e) {
    setListInput(e.target.value);
    setSubmitted(false);
  }

  return (
    <div>
      {/* <h3>Add Tweet</h3> */}
      <form onSubmit={handleSubmit}>
        <div className='add-form'>
          <div className="form-inputs">
            <label><strong>Tweet ID/URL</strong> <input type="text" onChange={handleInputChange} value={idInput} placeholder="Enter Tweet ID or URL" /></label>
            <select id='list-input' onChange={handleSelectChange} value={listInput}>
              <option value="">All</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className='submit-btn'>Add Tweet</button>
        </div>
      </form>
    </div>
  );
}

export default AddTweetForm;
