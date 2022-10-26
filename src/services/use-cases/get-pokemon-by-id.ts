import { client } from '~/lib/client';

export async function getPokemonById(id: string) {
  const response = await client.get(`/pokemon/${id}`);
  return response.data;
}

// get pokemon data by id
