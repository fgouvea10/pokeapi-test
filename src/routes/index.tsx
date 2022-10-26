import {
  Routes as ReactRouterRoutes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { Header } from '~/components/layout/header';

import { PokemonDetails } from '~/pages/details';
import { Favorites } from '~/pages/favorites';
import { Home } from '~/pages/home';
import { NotFound } from '~/pages/not-found';

export function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <ReactRouterRoutes>
        <Route index element={<Home />} />
        <Route path="/:id" element={<PokemonDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<NotFound />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
