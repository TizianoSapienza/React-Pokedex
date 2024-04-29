/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetPokemonInfoQuery } from '../slices/apiSlice';
import LoadingSpinner from './LoadingSpinner';
import { typeColors } from '../other/typeColors';

function PokemonCard({ pokemon }) {
  const {
    data: pokemonInfo,
    isLoading,
    isError,
  } = useGetPokemonInfoQuery(pokemon.url);

  const [pokemonType, setPokemonType] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch Pokemon info and set main type color
  useEffect(() => {
    if (pokemonInfo && pokemonInfo.types && pokemonInfo.types.length > 0) {
      const mainType = pokemonInfo.types[0].type.name;
      setPokemonType(mainType);
    }
  }, [pokemonInfo]);

  const typeColorClass = typeColors[pokemonType];

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Link to={pokemonInfo && `/pokemon/${pokemonInfo.id}`}>
      <div
        className={`relative rounded-xl shadow-xl shadow-zinc-400 hover:shadow-2xl hover:shadow-zinc-600 hover:scale-105 hover:cursor-pointer w-64 bg-opacity-70 ${
          typeColorClass || 'bg-gray-100'
        }`}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-red-600 text-center p-4">
            Error fetching Pokemon data
          </div>
        ) : (
          pokemonInfo && (
            <>
              <div className="flex flex-row justify-between items-center h-10 w-full mt-1 px-3">
                <p className="text-gray-800 text-lg font-bold font-mono">
                  #{pokemonInfo.id}
                </p>
              </div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
                alt={pokemonInfo.name}
                className={`mx-auto -mb-8 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  width: '120px',
                  height: '120px',
                  transition: 'opacity 0.5s ease',
                }}
                onLoad={handleImageLoad}
              />
              {imageLoading && <LoadingSpinner className="mx-auto mt-4" />}
              <div className="bg-zinc-800 text-white text-lg text-center font-semibold font-mono py-6 mt-2 rounded-xl w-full">
                {pokemonInfo.name.charAt(0).toUpperCase() +
                  pokemonInfo.name.slice(1)}
              </div>
            </>
          )
        )}
      </div>
    </Link>
  );
}

export default PokemonCard;
