import axios from "axios";

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export const getPokemonList = async (
  page: number = 1
): Promise<{ results: { name: string }[] }> => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};
