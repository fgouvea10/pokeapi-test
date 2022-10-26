import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { getPokemonData } from '~/services/useCases/get-pokemon-details';

interface PokemonData {
  img: string;
  name: string;
  id: string;
}

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();

  const { name, url } = pokemon;

  const getPokemonDetail = useCallback(async () => {
    try {
      const response = await getPokemonData(url);

      setPokemonData(response);
    } catch (err) {
      // console.log('err', err);
    }
  }, [url]);

  useEffect(() => {
    getPokemonDetail();
  }, [getPokemonDetail]);

  return (
    <Link
      to={`/${pokemonData?.id}`}
      className="py-8 px-6 bg-stone-100 border border-stone-200 rounded flex flex-col items-center justify-center gap-4 text-xl text-stone-700"
    >
      <img src={pokemonData?.img} alt="" className="w-44" />
      {pokemon && name?.charAt(0).toUpperCase() + name?.slice(1)}
    </Link>
  );
}
