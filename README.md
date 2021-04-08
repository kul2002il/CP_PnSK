# Цели

## 1. Регистрация

	{host}/signup

#### Метод: post.

#### Тело:
1. `first_name`
2. `surname`
3. `phone`
4. `password`

#### Успешно:
* Код: `201`
* Тело: `id` - id пользователя

#### Ошибка:
* Код: `422`.
* Тело: ключи - поля с ошибками.


## 2. Авторизация

	{host}/login

#### Метод: post.

#### Тело:
1. `phone`
2. `password`

#### Успешно:
* Код: `200`
* Тело: `token`

#### Ошибки:

Ошибка валидации
* Код: `422`.
* Тело: ключи - поля с ошибками.

Ошибка входа
* Код: `404`
* Тело: `login: "Incorrect login or password"`


##Авторизация
Все следующие запросы требуют авторизации.
Для авторизации указывается токен Bearer в заголовке Authorization.

	Authorization: "bearer {{токен}}"

#### Ошибка:
* Код: `403`
* Тело: `message: "You need authorization"`


## 3. Выход

	{host}/logout

#### Успешно:
* Код: `200`

## 4. Загрузка фотографии

## 5. Изменение фотографии

## 6. Получение фотографий

## 7. Получение одной фотографии

## 8. Удаление фотографии

## 9. Шаринг фотографий

## 10. Поиск пользователей

