import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button';
import { useLoginAccount } from '@/hooks/useLogin';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { router } from '@/App';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginAccount, isPending: isLoggingIn } = useLoginAccount();
  const [nameCredential, setNameCredential] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameCredential || !password) {
      alert('Incomplete fields');
      return;
    }

    if (isLoggingIn) return <h1>Loading</h1>;

    loginAccount(
      { nameCredential, password },
      {
        onSuccess: (data) => {
          login(data);
          toast.success(data.message);
          router.update({
            context: {
              isAuthenticated: true,
              user: data.user,
            },
          });
          navigate({ to: '/app' });
        },
        onError: (error) => {
          toast.error(error.message);
          console.error('Error logging in', error);
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-full gap-2 max-w-87.5">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-light">
          Login to <span className="font-bold">TrackEat</span>{' '}
        </span>
      </div>
      <span className="text-center text-sm">
        Don't have an account?
        <Link className="ml-1" to="/register">
          <span className="font-semibold hover:opacity-80 hover:cursor-pointer">
            Register now
          </span>
        </Link>
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="name-credential">
            Username / Email
          </label>
          <input
            onChange={(e) => setNameCredential(e.target.value)}
            className="border px-2 py-1 rounded focus:outline-none"
            type="text"
            id="name-credential"
            name="name-credential"
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="password-credential">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded focus:outline-none"
            type="password"
            id="password-credential"
            name="password-credential"
            placeholder="••••••••"
          />
        </div>
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
