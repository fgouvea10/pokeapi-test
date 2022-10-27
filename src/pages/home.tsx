import { useEffect, useState } from 'react';

import { getPokemons } from '~/services/use-cases/list-pokemons';
import storageKeys from '~/services/storage/keys';

import { PokemonCard } from '~/components/shared/cards/pokemon-card';
import { Pagination } from '~/components/shared/navigation/pagination';
import { getStorage } from '~/services/storage';
import type { PokemonType } from '~/domain/shared/pokemon';

interface Pokemon {
  // expected interface from api response
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const POKEMONS_PER_PAGE = 9;

export function Home() {
  const startPage = 1;
  // avoiding magic numbers

  const [page, setPage] = useState(startPage); // start the page
  const [pokemons, setPokemons] = useState<Pokemon>();
  const [pokemonsInStorage, setPokemonsInStorage] = useState<PokemonType[]>([]);

  const totalOfPages = pokemons && pokemons?.count / POKEMONS_PER_PAGE;

  const listPokemons = async () => {
    try {
      const offset =
        page === 1 ? 0 : page * POKEMONS_PER_PAGE - POKEMONS_PER_PAGE;
      const response = await getPokemons(offset, POKEMONS_PER_PAGE);

      setPokemons(response);
    } catch (err) {
      // console.log('err', err);
    }
  };

  useEffect(() => {
    const pokemonsInStorage = getStorage(storageKeys.favoritesPokemons); // get pokemons in storage
    if (pokemonsInStorage?.length > 0) {
      setPokemonsInStorage(pokemonsInStorage); // putting the value in a state to show the favorites on the home
      return;
    }
  }, [pokemonsInStorage]);

  useEffect(() => {
    listPokemons();
  }, [page]);

  useEffect(() => {
    document.title = 'PokeAPI - Pokemons';
  }, []);

  return (
    <div className="w-full max-w-6xl my-12 mx-auto p-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemons?.results?.map((pokemon, index) => {
          const favoritePokemons = pokemonsInStorage.find(
            (item) => item.name === pokemon.name,
          );
          // restoring favorite pokemons

          return (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              isFavorite={!!favoritePokemons}
            />
          );
        })}
      </div>
      <div className="w-full mt-8 flex items-center justify-center">
        <Pagination
          totalCountOfRegisters={totalOfPages as number}
          currentPage={page}
          onPageChange={setPage}
        />
        {/* custom pagination component */}
      </div>
    </div>
  );
}
