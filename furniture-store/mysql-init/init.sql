-- Даем пользователю 'user' все права на базу данных furniture_store
GRANT ALL PRIVILEGES ON furniture_store.* TO 'user'@'%';
FLUSH PRIVILEGES;