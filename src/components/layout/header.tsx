import { Link } from 'react-router-dom';

import logoImg from '~/assets/logo.png';
import pokemonIconImg from '~/assets/pokemon-icon.png';

export function Header() {
  return (
    <header className="w-full bg-blue-800">
      <div className="w-full max-w-6xl my-0 mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/">
          <img src={logoImg} alt="" className="w-32 h-auto" />
        </Link>
        <a href="/favorites" title="Favorites" aria-label="Favorites pokemons">
          <img src={pokemonIconImg} alt="" className="w-8 h-auto" />
        </a>
      </div>
    </header>
  );
}
