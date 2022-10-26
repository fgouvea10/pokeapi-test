import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import pokemonIconImg from '~/assets/pokemon-icon.png';

import { getStorage, setStorage } from '~/services/storage';
import storageKeys from '~/services/storage/keys';
import { getPokemonById } from '~/services/use-cases/get-pokemon-by-id';
import type { PokemonType as Pokemon } from '~/domain/shared/pokemon';

export function PokemonDetails() {
  const { id } = useParams(); // get old route id
  const navigate = useNavigate();

  const [isFetchingPokemon, setIsFetchingPokemon] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();

  const handleAddPokemonToFavorites = (pokemon: Pokemon) => {
    // get pokemons in storage
    const pokemonsInStorage = getStorage(storageKeys.favoritesPokemons);

    // checking if pokemon is already favorited
    const pokemonAlreadyExists = pokemonsInStorage.find(
      (item: Pokemon) => item.id === pokemon.id,
    );

    // returning custom error message
    if (pokemonAlreadyExists)
      return toast.error(`${pokemon?.name} is already on favorites`);

    // saving pokemon in storage and add custom message
    console.log(pokemonsInStorage);
    pokemonsInStorage.push(pokemon);
    setStorage(
      storageKeys.favoritesPokemons,
      JSON.stringify(pokemonsInStorage),
    );
    toast.success(`${pokemon?.name} added to favorites`);
  };

  const getPokemonDetails = async () => {
    setIsFetchingPokemon(true);

    try {
      const response = await getPokemonById(id as string);

      // mapping the data that matters
      const mappedBody = {
        id: response?.id,
        name: response?.name,
        img: response?.sprites.front_default,
        species: response?.species?.name,
        stats: response?.stats,
      };
      setPokemonDetails(mappedBody);
    } catch (err) {
      // redirecting to home in case of errors by the api
      navigate('/');
    } finally {
      setIsFetchingPokemon(false);
    }
  };

  useEffect(() => {
    if (id) {
      // checking if id is ready to fetch data
      getPokemonDetails();
    }
  }, [id]);

  useEffect(() => {
    // change the title of the page
    document.title = `${pokemonDetails?.name} - PokeAPI`;
  }, [id]);

  if (isFetchingPokemon) return <p>loading...</p>;

  return (
    <div className="w-full ax-w-6xl my-12 mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <img src={pokemonDetails?.img} className="w-96 h-auto" />
        <div>
          <div className="flex w-full items-center justify-between md:w-auto md:text-center">
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
              <img src={pokemonIconImg} alt="" className="w-8 h-auto" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
