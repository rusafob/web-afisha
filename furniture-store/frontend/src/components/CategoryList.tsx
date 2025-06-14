import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, AlertCircle } from 'lucide-react';
import api from '../api/client';
import { toast, Toaster } from 'sonner';
import axios, { AxiosError } from 'axios';

interface Category {
id: number;
name: string;
}

const defaultCategories = [
'Кино',
'Театр', 
'Концерт',
'Выставка',
'Спектакль',
'Фестиваль',
'Лекция',
'Мастер-класс',
'Спортивное мероприятие',
'Семинар'
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      const defaultCategoryObjects = defaultCategories.map((name, index) => ({
        id: index + 1,
        name: name
      }));
      setCategories(defaultCategoryObjects);
    }
  }, [categories]);
const [name, setName] = useState<string>('');
const [editingCategory, setEditingCategory] = useState<Category | null>(null);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const initializeCategories = async () => {
    try {
      const existingCategories = await api.get<Category[]>('/event-categories');
      
      console.log('Существующие категории:', existingCategories.data);

      const categoriesToAdd = defaultCategories.filter(
        defaultCat => !existingCategories.data.some(
          (existingCat) => 
            existingCat.name.toLowerCase().trim() === defaultCat.toLowerCase().trim()
        )
      );

      console.log('Категории для добавления:', categoriesToAdd);

      for (const categoryName of categoriesToAdd) {
        try {
          const response = await api.post('/event-categories', { name: categoryName });
          console.log(`Добавлена категория: ${categoryName}`, response.data);
        } catch (addError) {
          console.error(`Не удалось добавить категорию ${categoryName}:`, addError);
        }
      }

      fetchCategories();

    } catch (error) {
      console.error('Полная ошибка инициализации категорий:', error);
      
      fetchCategories();
    }
  };

  initializeCategories();
}, []);

const fetchCategories = async () => {
  setIsLoading(true);
  try {
    const response = await api.get<Category[]>('/event-categories');
    
    console.log('Загруженные категории:', response.data);
    
    if (response.data.length === 0) {
      console.warn('Список категорий пуст. Попытка добавить дефолтные.');
      
      for (const categoryName of defaultCategories) {
        try {
          await api.post('/event-categories', { name: categoryName });
        } catch (error) {
          console.error(`Ошибка при добавлении категории ${categoryName}:`, error);
        }
      }
      
      const updatedResponse = await api.get<Category[]>('/event-categories');
      setCategories(updatedResponse.data);
    } else {
      setCategories(response.data);
    }
    
    setIsLoading(false);
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    
    toast.error('Не удалось загрузить категории', {
      description: 'Проверьте подключение к интернету',
      icon: <AlertCircle className="text-red-500" />
    });
    
    setIsLoading(false);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name.trim()) return;

  try {
    if (editingCategory) {
      await api.put(`/event-categories/${editingCategory.id}`, { 
        name: name.trim() 
      });
      toast.success('Категория обновлена');
      setEditingCategory(null);
    } else {
      await api.post('/event-categories', { 
        name: name.trim() 
      });
      toast.success('Категория добавлена');
    }
    
    setName('');
    fetchCategories();
  } catch (error) {
    console.error('Полная ошибка:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Данные ошибки:', axiosError.response?.data);
      console.error('Статус ошибки:', axiosError.response?.status);
      
      toast.error('Не удалось создать/обновить категорию', {
        description: (axiosError.response?.data as any)?.message || 'Неизвестная ошибка сервера'
      });
    } else {
      toast.error('Ошибка запроса', {
        description: (error as Error).message
      });
    }
  }
};

const handleDelete = async (id: number) => {
  try {
    await api.delete(`/event-categories/${id}`);
    toast.success('Категория удалена');
    fetchCategories();
  } catch (error) {
    toast.error('Не удалось удалить категорию', {
      description: 'Возможно, категория используется в мероприятиях'
    });
  }
};

const startEditing = (category: Category) => {
  setEditingCategory(category);
  setName(category.name);
};

const cancelEditing = () => {
  setEditingCategory(null);
  setName('');
};

return (
  <div className="container mx-auto px-4 py-8">
    <Toaster richColors position="top-right" />
    
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 flex items-center">
        <span className="mr-3">Категории мероприятий</span>
        {isLoading && (
          <div className="animate-spin text-blue-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path d="M21.5 2v6h-6M3.5 22v-6h6" />
              <path d="M11.5 3.5a10 10 0 1 0 9.5 10" />
            </svg>
          </div>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 flex">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={editingCategory ? "Редактировать категорию" : "Новая категория"}
          required
          className="flex-grow p-3 border-2 border-blue-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button 
          type="submit"
          className={`
            flex items-center justify-center 
            px-6 py-3 
            ${editingCategory 
              ? 'bg-yellow-500 hover:bg-yellow-600' 
              : 'bg-green-500 hover:bg-green-600'
            } 
            text-white 
            rounded-r-lg 
            transition duration-300 
            group
          `}
        >
          {editingCategory ? 'Обновить' : 'Добавить'}
          <Plus className="ml-2 group-hover:rotate-90 transition" />
        </button>
        {editingCategory && (
          <button 
            type="button"
            onClick={cancelEditing}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition duration-300"
          >
            Отмена
          </button>
        )}
      </form>

      <div className="space-y-3">
        {categories.map(cat => (
          <div 
            key={cat.id} 
            className="
              bg-white 
              p-4 
              rounded-lg 
              shadow-sm 
              hover:shadow-md 
              transition 
              duration-300 
              flex 
              justify-between 
              items-center
              border-l-4 
              border-blue-500
            "
          >
            <span className="text-gray-700 font-medium">{cat.name}</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => startEditing(cat)}
                className="
                  text-blue-500 
                  hover:text-blue-700 
                  hover:bg-blue-50 
                  p-2 
                  rounded-full 
                  transition
                "
              >
                <Edit3 size={20} />
              </button>
              <button 
                onClick={() => handleDelete(cat.id)}
                className="
                  text-red-500 
                  hover:text-red-700 
                  hover:bg-red-50 
                  p-2 
                  rounded-full 
                  transition
                "
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 italic py-6">
            Категории отсутствуют
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default CategoryList;