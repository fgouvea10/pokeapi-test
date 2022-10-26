/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heart } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getStorage, setStorage } from '~/services/storage';
import storageKeys from '~/services/storage/keys';
import { getPokemonById } from '~/services/useCases/get-pokemon-by-id';

interface Pokemon {
  id: string;
  name: string;
  img: string;
  species: string;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export function PokemonDetails() {
  const { id } = useParams();

  const [isFetchingPokemon, setIsFetchingPokemon] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();

  const handleAddPokemonToFavorites = (pokemon: Pokemon) => {
    const pokemonsInStorage = getStorage(storageKeys.favoritesPokemons);

    const pokemonAlreadyExists = pokemonsInStorage.find(
      (item: Pokemon) => item.id === pokemon.id,
    );

    if (pokemonAlreadyExists) return;

    console.log(pokemonsInStorage);
    pokemonsInStorage.push(pokemon);
    setStorage(
      storageKeys.favoritesPokemons,
      JSON.stringify(pokemonsInStorage),
    );
  };

  const getPokemonDetails = async () => {
    setIsFetchingPokemon(true);

    try {
      const response = await getPokemonById(id as string);

      const mappedBody = {
        id: response?.id,
        name: response?.name,
        img: response?.sprites.front_default,
        species: response?.species?.name,
        stats: response?.stats,
      };
      setPokemonDetails(mappedBody);
    } catch (err) {
      // console.log('err', err);
    } finally {
      setIsFetchingPokemon(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPokemonDetails();
    }
  }, [id]);

  useEffect(() => {
    document.title = `${pokemonDetails?.name} - PokeAPI`;
  }, [id]);

  if (isFetchingPokemon) return <p>loading...</p>;

  return (
    <div className="w-full ax-w-6xl my-12 mx-auto p-4">
      <div className="flex items-center justify-center gap-8">
        <img src={pokemonDetails?.img} className="w-96 h-auto" />
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-medium">{pokemonDetails?.name}</h1>
              <span className="text-xs">Specie: {pokemonDetails?.species}</span>
            </div>
            <button
              type="button"
              title="Add to favorites"
              aria-label="Add pokemon to favorites"
              onClick={() =>
                handleAddPokemonToFavorites(pokemonDetails as Pokemon)
              }
            >
              <Heart size={30} className="text-blue-700" fill="blue" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {pokemonDetails?.stats.map((detail, index) => (
              <div key={index} className="bg-stone-200 p-4 rounded">
                <strong className="block text-center">
                  {detail?.stat?.name.toUpperCase()}
                </strong>
                <span className="block text-center">{detail?.base_stat}</span>
              </div>
            ))}
            {/* <div className="bg-stone-200 p-4 rounded">
              <strong className="block text-center">Species</strong>
              <span className="block text-center">
                {pokemonDetails?.species}
              </span>
            </div>
            <div className="bg-stone-200 p-4 rounded">
              <strong className="block text-center">Experience</strong>
              <span className="block text-center">
                {pokemonDetails?.experience}
              </span>
            </div>
            <div className="bg-stone-200 p-4 rounded">
              <strong className="block text-center">Height</strong>
              <span className="block text-center">
                {pokemonDetails?.height}
              </span>
            </div>
            <div className="bg-stone-200 p-4 rounded">
              <strong className="block text-center">Order</strong>
              <span className="block text-center">{pokemonDetails?.order}</span>
            </div>
            <div className="bg-stone-200 p-4 rounded">
              <strong className="block text-center">Weight</strong>
              <span className="block text-center">
                {pokemonDetails?.weight}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
