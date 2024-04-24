import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { useGetPokemonListQuery } from '../slices/apiSlice';

export default function PokemonList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageInput, setCurrentPageInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: pokemonData, isLoading, isError } = useGetPokemonListQuery(currentPage);

  // Calculate total number of Pokémon to display based on search query
  let totalPokemonCount;
  if (searchQuery) {
    if (pokemonData) {
      totalPokemonCount = pokemonData.results.filter(
        pokemon => pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      ).length;
    } else {
      totalPokemonCount = 0;
    }
  } else {
    totalPokemonCount = pokemonData ? pokemonData.count : 0;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(Math.min(totalPokemonCount, 1025) / 20); 

  // Pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to page prompt
  const goToPage = () => {
    const pageNumber = parseInt(currentPageInput);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setCurrentPageInput('');
    } else {
      alert(`Invalid page number. Please enter a number between 1 and ${totalPages}.`);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when search query changes
  }, [searchQuery]);

  // Loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error handling
  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Filter displayed Pokemon based on search query
  const filteredPokemon = searchQuery
    ? pokemonData.results.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    : pokemonData.results;

  // Paginate filtered Pokemon
  const paginatedPokemon = filteredPokemon.slice((currentPage - 1) * 20, currentPage * 20);

  return (
    <>
      <h1 className="text-center text-4xl font-bold font-mono mb-8">Pokédex</h1>
      <SearchBar handleSearch={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-auto justify-items-center">
        {filteredPokemon.length === 0 ? (
          <div>No Pokémon found.</div>
        ) : (
          paginatedPokemon.map((pokemon, index) => (
            <div key={index} className="w-full sm:w-auto md:w-auto lg:w-auto">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))
        )}
      </div>
      <div className="my-auto text-black font-bold font-mono mt-2">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <button
          onClick={goToPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded-lg"
        >
          Go to Page
        </button>
        <input
          type="number"
          value={currentPageInput}
          onChange={(e) => setCurrentPageInput(e.target.value)}
          className="ml-2 px-1 py-1 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-700"
          min="1"
          max={totalPages}
          placeholder={`${currentPage}/${totalPages}`}
        />
      </div>
    </>
  );
}
