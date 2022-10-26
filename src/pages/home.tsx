import { useEffect, useState } from 'react';

import { getPokemons } from '~/services/useCases/list-pokemons';

import { PokemonCard } from '~/components/shared/cards/pokemon-card';
import { Pagination } from '~/components/shared/navigation/pagination';

interface Pokemon {
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const POKEMONS_PER_PAGE = 9;

export function Home() {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon>();

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

  console.log(pokemons);

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
          return <PokemonCard key={index} pokemon={pokemon} />;
        })}
      </div>
      <div className="w-full mt-8 flex items-center justify-between">
        <div>
          <strong>{POKEMONS_PER_PAGE}</strong> -{' '}
          <strong>{POKEMONS_PER_PAGE}</strong> de <strong>totalCount</strong>
        </div>
        <Pagination
          totalCountOfRegisters={totalOfPages as number}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
