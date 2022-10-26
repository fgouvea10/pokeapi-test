import axios from 'axios';

import { GetPokemonData } from '../protocols/get-pokemon-data';

export async function getPokemonData(url: string) {
  const { data } = await axios.get<GetPokemonData.Response>(url);

  const newPokemonData = {
    name: data?.name,
    id: data?.id,
    img: data?.sprites?.front_default,
  };

  return newPokemonData;
}
