import { useState } from 'react';
import Button from '../../components/Button';

const LoginPage = () => {
  const [nameCredential, setNameCredential] = useState<string | undefined>(
    undefined,
  );
  const [password, setPassword] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(nameCredential, password);
  };

  return (
    <div className="flex flex-col w-full gap-8 max-w-75">
      <div className="flex flex-col items-center">
        Logo <span>TrackEat</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="name-credential">
            Username / Email
          </label>
          <input
            onChange={(e) => setNameCredential(e.target.value)}
            className="border px-2 py-1 rounded"
            type="text"
            id="name-credential"
            name="name-credential"
            placeholder="Markiplier"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="password-credential">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded"
            type="password"
            id="password-credential"
            name="password-credential"
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
