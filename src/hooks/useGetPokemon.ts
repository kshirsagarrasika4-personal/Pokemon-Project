import { gql, useQuery } from "@apollo/client";

export type PokemonDetail = {
  id: string;
  number: string;
  name: string;
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (vars: { id?: string; name?: string }) => {
  return useQuery<{ pokemon: PokemonDetail }>(GET_POKEMON, {
    variables: vars,
    skip: !vars.id && !vars.name,
  });
};
