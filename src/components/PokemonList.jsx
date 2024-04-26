import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination'; // New component for pagination
import PokemonGrid from './PokemonGrid';
import { useGetPokemonListQuery } from '../slices/apiSlice';

export default function PokemonList() {
  const [searchResults, setSearchResults] = useState('');
  const [currentPageInput, setCurrentPageInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: pokemonData, isLoading, isError } = useGetPokemonListQuery(currentPage);

  // Calculate total number of Pokémon to display based on search query
  let totalPokemonCount;
  if (searchResults) {
    if (pokemonData) {
      totalPokemonCount = pokemonData.results.filter(
        pokemon => pokemon.name.toLowerCase().startsWith(searchResults.toLowerCase())
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
  }, [searchResults]);

  // Loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error handling
  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Filter displayed Pokemon based on search query
  const filteredPokemon = searchResults
    ? pokemonData.results.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(searchResults.toLowerCase())
      )
    : pokemonData.results;

  // Paginate filtered Pokemon
  const paginatedPokemon = filteredPokemon.slice((currentPage - 1) * 20, currentPage * 20);

  return (
    <>
      <h1 className="text-center text-4xl font-bold font-mono mb-8">Pokédex</h1>
      <SearchBar handleSearch={setSearchResults} />
      <PokemonGrid paginatedPokemon={paginatedPokemon} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
        goToPage={goToPage}
        currentPageInput={currentPageInput}
        setCurrentPageInput={setCurrentPageInput}
      />
    </>
  );
}