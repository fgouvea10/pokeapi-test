import {
  Routes as ReactRouterRoutes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { AppLayout } from '~/layouts/app-layout';

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route index element={<AppLayout />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
