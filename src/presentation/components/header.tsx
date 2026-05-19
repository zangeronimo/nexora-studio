import { useAuthSession } from '@presentation/session/use-auth-session';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { session } = useAuthSession();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <header>
      <h1>NEXORA</h1>
      <small>Bem vindo {session?.user?.name}</small>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};
