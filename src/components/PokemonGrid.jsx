/* eslint-disable react/prop-types */
import PokemonCard from './PokemonCard';

export default function PokemonGrid({ paginatedPokemon }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-auto justify-items-center">
      {paginatedPokemon.length === 0 ? (
        <div className="flex items-center justify-center h-full">No Pokémon found.</div>
      ) : (
        paginatedPokemon.map((pokemon, index) => (
          <div key={index} className="w-full sm:w-auto md:w-auto lg:w-auto">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))
      )}
    </div>
  );
}