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
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="size-25 border"></div>
          <div className="size-25 border"></div>
          <div className="size-25 border"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
