const HTTP_RESPONSE = {
  badRequest: { status: 400, message: 'Некорректный тип данных, длина поля или не хватает обязательных полей' },
  unauthorized: { status: 401, message: 'Ошибка авторизации' },
  forbidden: { status: 403, message: 'Доступ запрещен' },
  notFound: {
    status: 404,
    message: 'Некорректный URL',
    absentedMessage: {
      user: 'Пользователь с указанным id не найден',
      card: 'Фильм с указанным id не найден',
    },
  },
  conflict: { status: 409, message: 'Сущность уже существует' },
  internalError: { status: 500, message: 'На сервере произошла ошибка' },
};

const VALIDATION_ERROR_MESSAGE = {
  URL: 'Указана некорректная ссылка',
  email: 'Неверный адрес электронной почты',
  credential: 'Неправильные почта или пароль',
};

const ERROR_TYPE = {
  cast: 'CastError',
  validity: 'ValidationError',
};

module.exports = {
  ERROR_TYPE,
  HTTP_RESPONSE,
  VALIDATION_ERROR_MESSAGE,
};
