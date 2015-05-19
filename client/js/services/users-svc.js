(function(ng) {
  ng.module('app')
  .service('UsersSvc', ['$http', 'REST_API_ROUTE', '$resource', '$q', '$injector',
    function ($http, REST_API_ROUTE, $resource, $q, $injector) {
      
      var _users = {};
      var _userId;
      var self = this;
      var Users = $resource(REST_API_ROUTE + 'users/:userId',
      { userId:'@id' },
      { 
        query: { method: 'GET', isArray: true},
        get: { method: 'GET' },
        save: { method: 'POST' },
        update: { method: 'PUT' },
      });
      /**
       * Queries all users
       * @param success {Function} Success callback
       * @param error {Function} Error callback
       * @return {Promise}
       */ 
      self.getUsers = function (success, error) {
        return $q(function (resolve, reject) {
          Users.query().$promise
          .then(function (res) {
            if (typeof success === 'function') {
              success(res);
            }
            resolve(res);
          }, function (err) {
            if (typeof error === 'function') {
              error(err);
            }
            reject(err);
          });
        });
      };
      /**
       * Get user from database
       * @param user {Object} User resource
       * @param success {Function} Success callback
       * @param error {Function} Error callback
       * @return {Promise}
       */ 
      self.getUser = function (id, success, error) {
        return $q(function (resolve, reject) {
          Users.get({ userId: id }).$promise
          .then(function (res) {
            if (typeof success === 'function') {
              success(res);
            }
            resolve(res);
          }, function (err) {
            if (typeof error === 'function') {
              error(err);
            }
            reject(err);
          });
        });
      };
      /**
       * Save or update user to database
       * @param user {Object} User resource
       * @param success {Function} Success callback
       * @param error {Function} Error callback
       * @return {Promise}
       */ 
      self.saveUser = function (user, success, error) {
        user.updatedAt = new Date();
        return $q(function (resolve, reject) {
          ((null != user._id)
            ? Users.update
            : Users.save)(user, function () {
            if (typeof success === 'function') {
              success();
            }
            resolve();
          }, function () {
            if (typeof error === 'function') {
              error();
            }
          });
        });
      };
      /**
       * Gets/Sets current user.
       * @param user current user.
       * @return {Object} Current user.
       */
      self.user = function (user) {
        if ('undefined' === typeof user) { return _users[_userId]; }
        _userId = user._id;
        _users[_userId] = user;
      };
      /**
       * Sets authorization header.
       * @param header authorization header.
       */
      self.authorization = function (header) {
        Users = $resource(REST_API_ROUTE + 'users/:userId',
        { userId:'@id' },
        { 
          query: { method: 'GET', isArray: true, headers: { Authorization: header }},
          get: { method: 'GET', headers: { Authorization: header } },
          save: { method: 'POST', headers: { Authorization: header } },
          update: { method: 'PUT', headers: { Authorization: header } },
        });
      };
    }]);
})(window.angular);