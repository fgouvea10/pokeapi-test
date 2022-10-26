import { client } from '~/lib/client';

export async function getPokemons(offset = 0, perPage = 10) {
  const response = await client.get(
    `/pokemon?offset=${offset}&limit=${perPage}`,
  );

  return response.data;
}

// list of pokemons with custom pagination
