(function(ng) {
  ng.module('app')
  .service('UsersSvc', ['$http', 'REST_API_ROOT', '$resource', '$q',
    function ($http, REST_API_ROOT, $resource, $q) {
      var self = this;
      var Users = $resource(REST_API_ROOT + '/users/:userId',
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
    }]);
})(window.angular);