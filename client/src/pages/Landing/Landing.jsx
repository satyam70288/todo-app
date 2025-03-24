import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../assets/images/hero.jpg';

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="block">Organize work and life</span>
          <span className="block text-red-500">finally.</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Type just anything into the task field, and our unique natural language recognition will instantly populate your to-do list.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
          >
            Register Now!
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <img src={Hero} alt="Hero" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default Landing;
