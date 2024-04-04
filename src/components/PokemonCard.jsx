/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
  // Pokemon type colors
  const typeColors = {
    normal: 'bg-[#A8A878]',
    fire: 'bg-[#F08030]',
    water: 'bg-[#6890F0]',
    grass: 'bg-[#78C850]',
    electric: 'bg-[#F8D030]',
    ice: 'bg-[#98D8D8]',
    fighting: 'bg-[#C03028]',
    poison: 'bg-[#A040A0]',
    ground: 'bg-[#E0C068]',
    flying: 'bg-[#A890F0]',
    psychic: 'bg-[#F85888]',
    bug: 'bg-[#A8B820]',
    rock: 'bg-[#B8A038]',
    ghost: 'bg-[#705898]',
    dark: 'bg-[#705848]',
    dragon: 'bg-[#7038F8]',
    steel: 'bg-[#B8B8D0]',
    fairy: 'bg-[#EE99AC]',
  };

  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);

  // Fetch Pokemon info and set main type color
  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        const mainType = data.types[0].type.name;
        setPokemonInfo(data);
        setPokemonType(mainType);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemonInfo();
  }, [pokemon.url]);

  const typeColorClass = typeColors[pokemonType];

  return (
    <Link to={pokemonInfo && `/pokemon/${pokemonInfo.id}`}>
      <div
        className={`relative rounded-xl shadow-xl shadow-zinc-400 hover:shadow-2xl hover:shadow-zinc-600 hover:scale-105 hover:cursor-pointer w-64 bg-opacity-70 ${
          typeColorClass || 'bg-gray-100'
        }`}
      >
        {pokemonInfo && (
          <>
            <div className="flex flex-row justify-between items-center h-10 w-full mt-1 px-3">
              <p className="text-gray-800 text-lg font-bold font-mono">
                #{pokemonInfo.id}
              </p>
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
              alt={pokemonInfo.name}
              className="mx-auto -mb-8"
              style={{ width: '120px', height: '120px' }}
            />
            <div className=" bg-zinc-800 text-white text-lg text-center font-semibold font-mono py-6 mt-2 rounded-xl w-full">
              {pokemonInfo.name.charAt(0).toUpperCase() +
                pokemonInfo.name.slice(1)}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default PokemonCard;