import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button';
import { useRegisterAccount } from '@/hooks/useRegister';
import { toast } from 'sonner';
import { FormInput } from '@/components/Input';

const RegisterPage = () => {
  const { mutate: createAccount, isPending: isCreatingAccount } =
    useRegisterAccount();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Incomplete fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password Mismatch');
      return;
    }

    if (isCreatingAccount) return <h1>Loading</h1>;

    createAccount(
      { email, password },
      {
        onSuccess: () => {
          toast.success('Account created sucessfully');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate({
            to: '/login',
          });
        },
        onError: (error) => {
          toast.error(error.message);
          console.error('Account creation failed', error);
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-full gap-2 max-w-87.5">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-light">
          Create your <span className="font-bold">TrackEat</span> Account
        </span>
      </div>
      <span className="text-center text-sm">
        Already have an account?
        <Link className="ml-1" to="/login">
          <span className="font-semibold hover:opacity-80 hover:cursor-pointer">
            Login now
          </span>
        </Link>
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FormInput
          type="text"
          labelValue="Email Address"
          name="name-credential"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="john.doe@example.com"
        />
        <FormInput
          type="password"
          labelValue="Password"
          name="password-credential"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="••••••••"
        />
        <FormInput
          type="password"
          labelValue="Confirm Password"
          name="cf-password-credential"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="••••••••"
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
