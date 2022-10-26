import { Route, Routes } from 'react-router-dom';
import { Favorites } from '~/pages/favorites';
import { Home } from '~/pages/home';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":id" element={<></>} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  );
}
