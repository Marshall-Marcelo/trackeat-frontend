import Button from '../../components/Button';
import { Link } from '@tanstack/react-router';

const LandingPage = () => {
  return (
    <div className="grid place-items-center m-0 h-dvh">
      <div className="flex flex-col gap-4 items-center mx-4 md:max-w-175">
        <div className="w-full flex flex-col items-center gap-2 text-center">
          <span className="text-4xl ">Know your food patterns</span>
          <p className="font-light">
            Want to know more about your Gut? Track what you eat and find your
            preference.
          </p>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
        <div className="flex items-center w-full flex-col gap-4 md:flex-row">
          <div className="w-3/4 rounded-lg shadow p-4">
            <span className="text-xl">List what you eat</span>
            <p className="text-sm font-light">
              Type in your meal details and we'll breakdown the details for you
            </p>
          </div>
          <div className="w-3/4 rounded-lg shadow p-4">
            <span className="text-xl">Find your food habits</span>
            <p className="text-sm font-light">
              The more you list the more you will know about what you consume
            </p>
          </div>
          <div className="w-3/4 rounded-lg shadow p-4">
            <span className="text-xl">Adjust for the future</span>
            <p className="text-sm font-light">
              Understand what you eat and adjust accordingly for a better future
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
