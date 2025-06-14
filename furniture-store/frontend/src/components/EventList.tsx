import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

// Типизированный интерфейс события
interface Event {
id: number;
title: string;
date: string;
description: string;
category?: string;
}

// Общий класс для инпутов
const inputClassName = `
mt-1 
block 
w-full 
rounded-lg 
border-0 
border-b-2 
border-blue-200 
bg-transparent 
text-gray-700 
font-normal 
focus:border-blue-500 
focus:ring-0 
focus:outline-none 
transition 
duration-200 
text-base 
py-2 
px-1
`;

// Начальное состояние нового события
const INITIAL_EVENT_STATE = {
title: '',
date: '',
description: '',
category: ''
};

// Категории мероприятий
const EVENT_CATEGORIES = [
'Конференция', 
'Концерт', 
'Выставка', 
'Спортивное мероприятие', 
'Другое'
];

const EventsList: React.FC = () => {
// Состояния для списка событий и нового события
const [events, setEvents] = useState<Event[]>([]);
const [newEvent, setNewEvent] = useState(INITIAL_EVENT_STATE);
const [editingEventId, setEditingEventId] = useState<number | null>(null);

// Мемоизированный обработчик изменения инпутов
const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setNewEvent(prev => ({
    ...prev,
    [name]: value
  }));
}, []);

// Добавление нового события
const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (editingEventId) {
    // Режим редактирования
    setEvents(prev => 
      prev.map(event => 
        event.id === editingEventId 
          ? { ...event, ...newEvent } 
          : event
      )
    );
    setEditingEventId(null);
  } else {
    // Режим создания нового события
    const eventToAdd = {
      ...newEvent,
      id: Date.now()
    };
    setEvents(prev => [...prev, eventToAdd]);
  }
  
  // Сброс формы
  setNewEvent(INITIAL_EVENT_STATE);
}, [newEvent, editingEventId]);

// Удаление события
const handleDeleteEvent = useCallback((id: number) => {
  setEvents(prev => prev.filter(event => event.id !== id));
}, []);

// Начало редактирования события
const handleEditEvent = useCallback((event: Event) => {
  setEditingEventId(event.id);
  setNewEvent({
    title: event.title,
    date: event.date,
    description: event.description,
    category: event.category || ''
  });
}, []);

return (
  <div className="
    bg-white/70 
    backdrop-blur-lg 
    shadow-2xl 
    rounded-2xl 
    p-8 
    w-full 
    transform 
    transition 
    duration-500 
    border 
    border-blue-100/50
  ">
    <h2 className="
      text-3xl 
      font-extrabold 
      text-transparent 
      bg-clip-text 
      bg-gradient-to-r 
      from-blue-600 
      to-purple-600 
      mb-6 
      text-center
    ">
      Управление Мероприятиями
    </h2>
    
    {/* Форма добавления/редактирования мероприятия */}
    <form 
      onSubmit={handleSubmit} 
      className="mb-8 bg-white/50 rounded-lg p-6 shadow-md"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Название мероприятия
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className={inputClassName}
              required
              placeholder="Введите название"
            />
          </label>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Дата
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </label>
        </div>
      </div>
      
      <div className="mt-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Категория
    <select
      name="category"
      value={newEvent.category}
      onChange={handleInputChange}
      className={`${inputClassName} appearance-none`}
      required
    >
      <option value="">Выберите категорию</option>
      {EVENT_CATEGORIES.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </label>
</div>
      
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Описание
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className={`${inputClassName} resize-none`}
            required
            placeholder="Введите описание мероприятия"
            rows={3}
          />
        </label>
      </div>
      
      <div className="flex justify-end mt-4">
        <button 
          type="submit" 
          className="
            flex 
            items-center 
            gap-2 
            bg-blue-500 
            hover:bg-blue-600 
            text-white 
            font-bold 
            py-2 
            px-4 
            rounded 
            transition 
            duration-300 
            ease-in-out 
            transform 
            hover:scale-105
          "
        >
          <PlusCircle size={20} />
          {editingEventId ? 'Обновить' : 'Добавить'} мероприятие
        </button>
      </div>
    </form>
    
    {/* Список мероприятий */}
    {events.length === 0 ? (
      <div className="
        text-center 
        text-gray-500 
        bg-gray-100 
        rounded-lg 
        p-6 
        border 
        border-dashed 
        border-gray-300
      ">
        Нет добавленных мероприятий
      </div>
    ) : (
      <div className="space-y-4">
        {events.map(event => (
          <div 
            key={event.id} 
            className="
              bg-white/70 
              backdrop-blur-md 
              shadow-md 
              rounded-lg 
              p-4 
              flex 
              justify-between 
              items-center 
              hover:shadow-lg 
              transition-all 
              duration-300 
              border 
              border-blue-100/50
            "
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                {event.category && (
                  <span className="
                    bg-blue-100 
                    text-blue-600 
                    text-xs 
                    px-2 
                    py-1 
                    rounded-full
                  ">
                    {event.category}
                  </span>
                )}
              </div>
              <p className="text-gray-600 flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-blue-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {event.date}
              </p>
              <p className="text-gray-500 mt-2">{event.description}</p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEditEvent(event)}
                className="
                  text-blue-500 
                  hover:text-blue-700 
                  transition 
                  hover:bg-blue-50 
                  p-2 
                  rounded-full
                "
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDeleteEvent(event.id)}
                className="
                  text-red-500 
                  hover:text-red-700 
                  transition 
                  hover:bg-red-50 
                  p-2 
                  rounded-full
                "
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default EventsList;