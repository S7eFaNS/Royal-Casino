import React, { useState } from 'react';
import { CreateItem } from './CreateItem';

const CreateItemButton: React.FC = () => {
  const [showCreateItem, setShowCreateItem] = useState(false);

  const handleButtonClick = () => {
    setShowCreateItem(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="btn" style={{backgroundColor:"#4f1098", color:"white"}}> 
        Add Item
      </button>
      {showCreateItem && <CreateItem />}
    </div>
  );
};

export default CreateItemButton;