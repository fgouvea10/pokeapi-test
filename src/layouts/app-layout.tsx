import { Header } from '~/components/layout/header';
import { AppRoutes } from '~/routes/app.routes';

export function AppLayout() {
  return (
    <main>
      <Header />
      <AppRoutes />
    </main>
  );
}
