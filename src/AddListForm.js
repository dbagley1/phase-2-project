import { useContext, useState } from 'react';
import { ListsContext } from './App';
import { TweetContext } from './Home';

function AddListForm(props) {
  const { createList } = useContext(ListsContext);

  const [nameInput, setNameInput] = useState(props.listInput);

  const onFormSubmit = createList;

  function handleSubmit(e) {
    e.preventDefault();
    onFormSubmit(nameInput);
  }

  function handleInputChange(e) {
    setNameInput(e.target.value);
  }

  return (
    <div>
      {/* <h3>Create New List</h3> */}
      <form onSubmit={handleSubmit}>
        <div className='add-list-form'>
          <div className="form-inputs">
            <input type="text" onChange={handleInputChange} value={nameInput} placeholder="New List Name" />
            <button type="submit" className='submit-btn'>Create List</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddListForm;
