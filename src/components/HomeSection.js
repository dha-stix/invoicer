import React from 'react';
import scale from '../images/scale.svg';
import { Link } from 'react-router-dom';

const HomeSection = () => {
  return (
    <div className="md:min-h-[90vh] w-full md:px-8 px-2 py-[50px] flex items-center justify-center bg-[#F7F5F2] lg:flex-row flex-col">
      <div
        className="pl-3 my-4 lg:mb-1 lg:text-left pr-6 mb-10"
        style={{ flex: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4 md:text-4xl">
          Scale your business 10X
        </h2>
        <p className="opacity-70 mb-4 text-sm md:text-base leading-loose">
          Crafting professional invoices is essential for creating the right
          brand image, building trust with customers, and encouraging payment.
          Invoicer lets you create perfect invoices in seconds.
        </p>

        <Link to="/login">
          <button className="rounded w-[200px] px-2 py-3 bg-blue-500 text-gray-50">
            LOG IN
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center" style={{ flex: 0.4 }}>
        <img src={scale} alt="Print invoices" className="w-2/3 lg:w-full" />
      </div>
    </div>
  );
};

export default HomeSection;