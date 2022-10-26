import { useEffect } from 'react';

import { Routes } from './routes';

import { getStorage, setStorage } from './services/storage';
import storageKeys from './services/storage/keys';

import './styles/global.css';

export function App() {
  // create array of pokemons if does not exists one in storage
  useEffect(() => {
    const pokemonsInStorage = getStorage(storageKeys.favoritesPokemons);
    if (pokemonsInStorage === null) {
      setStorage(storageKeys.favoritesPokemons, JSON.stringify([]));
      return;
    }
  }, []);

  return <Routes />;
}
