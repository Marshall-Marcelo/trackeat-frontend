import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import Button from '../../components/Button';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add Modal Here
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
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="name-credential">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="cf-password-credential">
            Confirm Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded focus:outline-none"
            type="password"
            id="cf-password-credential"
            name="cf-password-credential"
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

export default RegisterPage;
