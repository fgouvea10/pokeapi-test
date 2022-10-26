import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { Routes } from './routes';

import { getStorage, setStorage } from './services/storage';
import storageKeys from './services/storage/keys';

import './styles/global.css';

export function App() {
  // create array of pokemons if does not exists in storage
  useEffect(() => {
    const pokemonsInStorage = getStorage(storageKeys.favoritesPokemons);
    if (pokemonsInStorage === null) {
      setStorage(storageKeys.favoritesPokemons, JSON.stringify([]));
      return;
    }
  }, []);

  return (
    <>
      <Routes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
