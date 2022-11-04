const UPDATE_PARAMS = {
  new: true,
  runValidators: true,
};
const URL_REG_EXP = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;
const DEV_DB_URL = 'mongodb://localhost:27017/moviesdb';
module.exports = {
  UPDATE_PARAMS,
  URL_REG_EXP,
  DEV_DB_URL,
};
