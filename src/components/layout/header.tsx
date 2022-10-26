import { Heart } from 'phosphor-react';

import logoImg from '~/assets/logo.png';

export function Header() {
  return (
    <header className="w-full bg-yellow-500">
      <div className="w-full max-w-6xl my-0 mx-auto py-4 px-4 flex items-center justify-between">
        <img src={logoImg} alt="" className="w-32 h-auto" />
        <a href="/favorites" title="Favorites" aria-label="Favorites pokemons">
          <Heart size={24} className="text-black" />
        </a>
      </div>
    </header>
  );
}
