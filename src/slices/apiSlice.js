import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: () => 'pokemon?limit=1025',
      staleTime: 300,
    }),
    getPokemonInfo: builder.query({
      query: (url) => url,
      staleTime: 300,
    })
  }),
});

export const { useGetPokemonListQuery, useGetPokemonInfoQuery } = pokemonApi;
