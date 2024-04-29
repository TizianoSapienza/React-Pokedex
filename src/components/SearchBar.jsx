/* eslint-disable react/prop-types */
import { useState } from 'react';

function SearchBar({ handleSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchInput);
    }
  };

  return (
    <div className="flex justify-center mb-4 font-mono">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="px-4 py-2 border-2 border-red-500 rounded-lg focus:outline-none focus:border-red-600 mr-2"
      />
      <button
        onClick={handleSearchClick}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
