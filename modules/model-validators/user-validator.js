var validators = [
  {
    validate: function (token, user) {
      return token.email === user.email;
    },
    message: 'Changing email is not available!'
  },
  {
    validate: function (token, user) {
      return token.password === user.password;
    },
    message: 'Changing password is not available!'
  }
];

/**
 * @param token {Object} JWT Payload
 * @param user {Object} UserModel
 */
module.exports = function (token, user, fn) {
  for (var i = 0; i < validators.length; ++i) {
    if (!validators[i].validate(token, user)) {
      return fn(validators[i].message);
    }
  }
  return fn(null);
};