## Описание

Backend часть реплики приложения Trello, написанная с использованием фреймворка Nest.js и базы данных PostgreSql.

## Спроектированная структура базы данных

https://dbdiagram.io/d/66c5d146a346f9518cace2ff

## Для работы

1. Установите зависимости

```bash
$ npm install
```

2. Создайте в директории src файл .env с содержимым 

`
DATABASE_URL="postgresql://your_server_name:your_password@your_host:your_port/your_database_name?schema=public"
JWT_SECRET_KEY="your_key"
`

3. Запустите

```bash
$ npm run start:prod
```

Запущенный backend будет иметь 3000 порт. Адрес аpi-документации Swagger: localhost:3000/api.
