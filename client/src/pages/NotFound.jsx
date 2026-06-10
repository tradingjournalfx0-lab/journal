import { Link } from "react-router-dom";

export default function NotFound() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-white text-center p-5">

      <h1 className="text-8xl font-bold text-purple-500">

        404

      </h1>

      <h2 className="text-4xl font-bold mt-4">

        Page Not Found

      </h2>

      <p className="text-gray-400 mt-4 max-w-md">

        The page you are looking for does not exist.

      </p>

      <Link
        to="/"
        className="mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl transition-all">

        Go Home

      </Link>

    </div>

  );
}