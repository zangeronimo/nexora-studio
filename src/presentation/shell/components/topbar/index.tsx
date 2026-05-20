import { useAuthSession } from '@presentation/session/use-auth-session';

export const Topbar = () => {
  const { session } = useAuthSession();

  return (
    <header>
      <small>{session?.user.name}</small>
    </header>
  );
};
