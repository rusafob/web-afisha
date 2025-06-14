import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import EventsList from './components/EventList';
import AnimatedBackground from './components/AnimatedBackground';
import VRKSFDRS from './components/VRKSFDRS';

function App() {
  return (
    <BrowserRouter>
      {/* Добавляем анимированный фон */}
      <AnimatedBackground />
      
      <div className="min-h-screen flex flex-col relative">
        {/* Добавляем Header поверх фона */}
        <Header />
        
        {/* Основное содержимое */}
        <main className="flex-grow container mx-auto px-4 py-6 flex items-center justify-center relative z-10">
          <div className="grid md:grid-cols-12 gap-6 w-full">
            {/* Sidebar (закомментирован) */}
            {/* <div className="md:col-span-4 lg:col-span-3 bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-4 h-fit">
              <CategoryList />
            </div> */}
            
            {/* Main Content */}
            <div className="md:col-span-8 lg:col-span-9">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div className="flex items-center justify-center w-full">
                      <div className="
                        bg-white/70 
                        backdrop-blur-lg 
                        shadow-2xl 
                        rounded-2xl 
                        p-8 
                        max-w-2xl 
                        w-full 
                        text-center 
                        transform 
                        transition 
                        duration-500 
                        hover:scale-105
                        border 
                        border-blue-100/50
                      ">
                        <h2 className="
                          text-4xl 
                          font-extrabold 
                          text-transparent 
                          bg-clip-text 
                          bg-gradient-to-r 
                          from-blue-600 
                          to-purple-600 
                          mb-6
                        ">
                          Добро пожаловать на платформу мероприятий
                        </h2>
                        <p className="
                          text-xl 
                          text-gray-700 
                          leading-relaxed 
                          mb-6
                        ">
                          Откройте для себя увлекательный мир событий, 
                          где каждый может найти что-то интересное для себя.
                        </p>
                        <div className="
                          flex 
                          justify-center 
                          space-x-4
                        ">
                          <button className="
                            px-6 
                            py-3 
                            bg-blue-500 
                            text-white 
                            rounded-lg 
                            hover:bg-blue-600 
                            transition 
                            duration-300 
                            shadow-md
                          ">
                            Список событий
                          </button>
                          <button className="
                            px-6 
                            py-3 
                            bg-white 
                            text-blue-500 
                            border 
                            border-blue-500 
                            rounded-lg 
                            hover:bg-blue-50 
                            transition 
                            duration-300 
                            shadow-md
                          ">
                            Создать мероприятие
                          </button>
                        </div>
                      </div>
                    </div>
                  } 
                />
                <Route 
                  path="/events" 
                  element={<EventsList />} 
                />
                <Route 
                  path="/categories" 
                  element={<CategoryList />} 
                />
              </Routes>
            </div>
          </div>
        </main>
        
        {/* Футер */}
        <footer className="bg-white py-4 mt-6 relative z-10 shadow-md">
          <div className="container mx-auto text-center text-gray-700">
            <p>&copy; 2025 Веб-Афиша. Все права защищены.</p>
          </div>
        </footer>

      </div>
      <VRKSFDRS/>
    </BrowserRouter>
  );
}

export default App;