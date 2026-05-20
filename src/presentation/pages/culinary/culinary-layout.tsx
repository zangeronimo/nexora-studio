import { Outlet } from 'react-router-dom';

export function CulinaryLayout() {
  return (
    <main>
      <h1>Culinary</h1>
      <Outlet />
    </main>
  );
}
