import axios from 'axios';

import { GetPokemonData } from '../protocols/get-pokemon-data';

export async function getPokemonData(url: string) {
  const { data } = await axios.get<GetPokemonData.Response>(url);

  // getting data that really matters to the application
  const newPokemonData = {
    name: data?.name,
    id: data?.id,
    img: data?.sprites?.front_default,
  };

  // returning this data
  return newPokemonData;
}

// get pokemon data with url
