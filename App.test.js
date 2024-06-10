import React, { useState } from 'react';
import './MultiselectButton.css'; // Import CSS file for styling

const MultiselectButton = ({ options, onSelect }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleButtonClick = () => {
    onSelect(selectedItems);
  };

  return (
    <div className="multiselect-button">
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className={`option ${selectedItems.includes(option) ? 'selected' : ''}`} onClick={() => toggleItem(option)}>
            {option}
          </div>
        ))}
      </div>
      <button onClick={handleButtonClick}>Call Function</button>
    </div>
  );
};

export default MultiselectButton;
