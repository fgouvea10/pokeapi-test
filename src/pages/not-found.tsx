import { Link } from 'react-router-dom';
import logoIconImg from '~/assets/pokemon-icon.png';

export function NotFound() {
  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <strong className="text-9xl text-stone-400">4</strong>
        <img src={logoIconImg} alt="" className="w-56 h-auto" />
        <strong className="text-9xl text-stone-400">4</strong>
      </div>
      <div className="flex flex-col mt-8">
        <p className="text-center text-stone-700">
          It looks like you&apos;re lost. This page does not exists.
        </p>
        <Link
          to="/"
          className="bg-blue-500 p-4 rounded-full text-center text-white font-medium mt-4"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
