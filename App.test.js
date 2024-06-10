import React from 'react';
import Select from 'react-select';

const MultiSelectDropdown = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ];

  const handleOptionSelect = (selectedOption) => {
    // Call your function with the selected option value
    console.log("Selected option:", selectedOption);
  };

  return (
    <Select
      isMulti
      options={options}
      onChange={handleOptionSelect}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '200px',
          height: '40px'
        })
      }}
    />
  );
};

export default MultiSelectDropdown;
