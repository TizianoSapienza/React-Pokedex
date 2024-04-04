/* eslint-disable react/prop-types */
function SearchBar({ handleSearch }) {
  return (
    <div className="flex justify-center mb-4 font-mono">
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
        className="px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-700"
      />
    </div>
  );
}

export default SearchBar;