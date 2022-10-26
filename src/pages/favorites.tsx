import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PokemonType } from '~/domain/shared/pokemon';
import { getStorage } from '~/services/storage';
import storageKeys from '~/services/storage/keys';

type Pokemon = Pick<PokemonType, 'id' | 'name' | 'img'>;

export function Favorites() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const arrayOfPokemons: Pokemon[] = getStorage(
      storageKeys.favoritesPokemons,
    );

    const mappedArray = arrayOfPokemons.map((pokemon) => ({
      name: pokemon.name,
      img: pokemon.img,
      id: pokemon.id,
    }));

    setPokemons(mappedArray);
  }, []);

  return (
    <div className="w-full max-w-6xl my-12 mx-auto p-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemons?.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/${pokemon?.id}`}
            className="py-8 px-6 bg-stone-100 border border-blue-800 rounded flex flex-col items-center justify-center gap-4 text-xl text-stone-700"
          >
            <img src={pokemon?.img} alt="" className="w-44" />
            {pokemon &&
              pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
