import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';


export type Pokemon = {
  id: string
  number: string
  name: string
  types: string[]
  image: string
};

export type PokemonOption = {
  value: Pokemon['id']
  label: Pokemon['name']
}

export const GET_POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export const useGetPokemons = (first: number = 151) => {
  const queryRes = useQuery<{ pokemons: Pokemon[] }>(GET_POKEMONS, {
    variables: { first },
  });

  const pokemons: Pokemon[] = useMemo(() => queryRes.data?.pokemons || [], [queryRes.data])

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  }
}
