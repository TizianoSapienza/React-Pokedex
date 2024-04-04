import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

export default function PokemonList() {
  const navigate = useNavigate();
  const { page } = useParams(); // Get page number from URL
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1); // Set current page from URL or default to 1
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch Pokemon data, set loading state, and set total pages based on search results
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1025`
        );
        const data = await response.json();
        setPokemonData(data.results);
        setFilteredPokemon(data.results);
        setTotalPages(Math.ceil(data.results.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  // Filter Pokemon based on search query and set total pages based on search results
  useEffect(() => {
    setCurrentPage(1);
    const filterPokemon = () => {
      if (!searchQuery) {
        setFilteredPokemon(pokemonData);
        setTotalPages(Math.ceil(pokemonData.length / itemsPerPage));
      } else {
        const filtered = pokemonData.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setFilteredPokemon(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      }
    };

    filterPokemon();
  }, [searchQuery, pokemonData]);

  useEffect(() => {
    navigate(`?page=${currentPage}`); // Update URL when current page changes
  }, [currentPage, navigate]);

  const itemsPerPage = 20;
  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to page prompt
  const goToPage = () => {
    const inputPageNumber = prompt(`Enter a page number (1 - ${totalPages}):`);

    if (inputPageNumber) {
      const pageNumber = parseInt(inputPageNumber);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      } else {
        alert(
          `Invalid page number. Please enter a number between 1 and ${totalPages}.`
        );
      }
    }
  };

  // Loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold font-mono mb-8">Pokédex</h1>
      <SearchBar handleSearch={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-auto justify-items-center">
        {currentPokemon.map((pokemon, index) => (
          <div key={index} className="w-full sm:w-auto md:w-auto lg:w-auto">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded-lg mr-2"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <span className="my-auto text-black font-bold font-mono">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded-lg ml-2"
        >
          Go to Page
        </button>
      </div>
    </>
  );
}