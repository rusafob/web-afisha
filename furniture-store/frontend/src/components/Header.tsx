import React from 'react';
import { Link } from 'react-router-dom'; 

const Header: React.FC = () => {
return (
  <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200 shadow-md">
    <div className="flex items-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 mr-3 text-blue-600" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
        />
      </svg>
      <h1 className="text-2xl font-bold text-gray-800">АФИША</h1>
    </div>
    
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-blue-900 tracking-wide">
        Добро пожаловать на ВЕБ-АФИШУ
      </h2>
    </div>
    
    <div className="flex items-center space-x-4">
      <nav className="space-x-4 mr-4">
        <Link 
          to="/" 
          className="text-gray-700 hover:text-blue-600 transition duration-300"
        >
          Главная
        </Link>
        <Link 
          to="/events" 
          className="text-gray-700 hover:text-blue-600 transition duration-300"
        >
          Мероприятия
        </Link>
        <Link 
          to="/categories" 
          className="text-gray-700 hover:text-blue-600 transition duration-300"
        >
          Категории
        </Link>
      </nav>
      
      <button 
        className="
          px-4 py-2 
          bg-blue-500 
          text-white 
          rounded-md 
          hover:bg-blue-600 
          transition 
          duration-300 
          flex 
          items-center 
          space-x-2
          shadow-md
          hover:shadow-lg
        "
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        <span>Войти</span>
      </button>
    </div>
  </header>
);
};

export default Header;