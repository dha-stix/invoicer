import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <main className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <h3 className="text-2xl mb-4 font-bold">Page does not exit 😭</h3>
      <Link to="/" className="text-red-500">
        Go home ❇️
      </Link>
    </main>
  );
};

export default PageNotFound;