import React, { useState } from 'react';
import gerb from '../gerb_0_1.png';

const VRKSFDRS: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button 
      onClick={() => setIsOpen(true)}
      className="
        fixed 
        bottom-4 
        right-4 
        bg-blue-500 
        text-white 
        p-3 
        rounded-full 
        shadow-lg 
        hover:bg-blue-600 
        transition 
        z-50
      "
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </button>

    {isOpen && (
      <div 
        className="
          fixed 
          inset-0 
          bg-black/30 
          backdrop-blur-sm 
          flex 
          items-center 
          justify-center 
          z-[100]
        "
        onClick={() => setIsOpen(false)}
      >
        <div 
          className="
            bg-white 
            rounded-2xl 
            shadow-2xl 
            p-8 
            max-w-md 
            w-full 
            text-center 
            relative 
            transform 
            transition 
            scale-95 
            hover:scale-100
          "
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="
              absolute 
              top-4 
              right-4 
              text-gray-500 
              hover:text-gray-700 
              transition
            "
          >
            ✕
          </button>

          <img 
            src={gerb} 
            alt="Логотип" 
            className="
              mx-auto 
              mb-6 
              w-32 
              h-32 
              object-contain
            " 
          />

          <h2 className="
            text-2xl 
            font-bold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-blue-600 
            to-purple-600 
            mb-4
          ">
            Разработчики проекта
          </h2>

          <div className="space-y-4">
            <div className="
              bg-blue-50 
              rounded-lg 
              p-4 
              shadow-sm 
              border 
              border-blue-100
            ">
              <h3 className="
                text-lg 
                font-semibold 
                text-gray-800 
                mb-2
              ">
                Вераксо Марк
              </h3>
              <p className="text-gray-600">
                Frontend разработчик
              </p>
            </div>

            <div className="
              bg-purple-50 
              rounded-lg 
              p-4 
              shadow-sm 
              border 
              border-purple-100
            ">
              <h3 className="
                text-lg 
                font-semibold 
                text-gray-800 
                mb-2
              ">
                Федорицкий Руслан
              </h3>
              <p className="text-gray-600">
                Backend разработчик
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default VRKSFDRS;