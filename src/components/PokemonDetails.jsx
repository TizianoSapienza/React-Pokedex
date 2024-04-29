import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonInfoQuery } from '../slices/apiSlice';
import LoadingSpinner from './LoadingSpinner';
import { typeColors } from '../other/typeColors';

function PokemonDetails() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [shinySprite, setShinySprite] = useState(false);

  const { data: pokemonDetails, isLoading, isError } = useGetPokemonInfoQuery(`pokemon/${id}`);

  const toggleShinySprite = () => {
    setShinySprite((prev) => !prev);
  };

  const goBackToPokemonList = () => {
    navigateTo('/');
  };

  const goToPreviousPokemon = () => {
    const previousId = parseInt(id) - 1;
    navigateTo(`/pokemon/${previousId}`);
  };

  const goToNextPokemon = () => {
    const nextId = parseInt(id) + 1;
    navigateTo(`/pokemon/${nextId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error fetching Pokémon data</div>;
  }

  const { name, types, height, weight, abilities, stats } = pokemonDetails;
  const mainType = types[0].type.name;
  const backgroundColor = typeColors[mainType];
  const shinySpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  const notShinySpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const spriteUrl = shinySprite ? shinySpriteUrl : notShinySpriteUrl;

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold font-mono py-2 px-4 rounded-lg mb-4"
        onClick={goBackToPokemonList}
      >
        Back to Pokemon List
      </button>
      <div className="flex flex-col md:flex-row justify-center rounded-2xl shadow-lg bg-zinc-600 text-white p-6 font-mono md:shrink-0">
        {/* Left Section */}
        <div className="flex flex-col items-center rounded-xl md:mr-10 md:mb-0">
          <img
            src={spriteUrl}
            alt={name}
            className={`border-2 border-zinc-200 rounded-xl ${backgroundColor} bg-opacity-90 mt-2`}
          />
          <button
            onClick={toggleShinySprite}
            className="mt-4 rounded-xl px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold"
          >
            {shinySprite ? 'Show Normal Sprite' : 'Show Shiny Sprite'}
          </button>
        </div>
        {/* Right Section */}
        <div className="flex flex-col items-center md:ml-2 text-white">
          <h2 className="text-2xl font-bold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <div className="flex">
            {types.map((type, index) => (
              <p
                key={index}
                className={`text-white mt-2 mr-2 rounded-xl px-2 py-1 border-zinc-200 border-2 ${
                  typeColors[type.type.name.toLowerCase()]
                }`}
              >
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </p>
            ))}
          </div>
          <p className="text-white mt-2">Height: {height * 10} cm</p>
          <p className="text-white mt-2">Weight: {weight / 10} Kg</p>
          <p className="text-white mt-2 max-w-40">
            Abilities:{' '}
            {abilities
              .map(
                (ability) =>
                  ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1).replace('-', ' ')
              )
              .join(', ')}
          </p>
          {/* Fill Bars for Stats */}
          <div className="flex flex-col mt-5 mb-2 font-bold">
            {[
              { name: 'HP', prop: 'hp' },
              { name: 'ATK', prop: 'attack' },
              { name: 'DEF', prop: 'defense' },
              { name: 'S.ATK', prop: 'special-attack' },
              { name: 'S.DEF', prop: 'special-defense' },
              { name: 'SPD', prop: 'speed' },
            ].map((stat) => (
              <div key={stat.name} className=" items-center mt-1">
                <span className="text-white">{stat.name}</span>
                <div className="relative ml-2 flex items-center border-zinc-50 border-2 bg-white bg-opacity-40 rounded-full h-6 w-60">
                  <div
                    className={`absolute left-0 rounded-full h-full ${
                      typeColors[types[0].type.name.toLowerCase()]
                    }`}
                    style={{
                      width: `${
                        (stats.find((s) => s.stat.name === stat.prop)
                          .base_stat /
                          255) *
                        100
                      }%`, // Assuming max stat value is 255
                    }}
                  ></div>
                  <span className="absolute right-2 font-bold">
                    {stats.find((s) => s.stat.name === stat.prop).base_stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex align-center justify-center mt-4 font-mono">
        <button
          onClick={goToPreviousPokemon}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={goToNextPokemon}
          className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonDetails;