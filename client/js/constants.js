(function(ng) {
  ng.module('app')
  /**
   * Route prefix to API controllers
   */
  .constant('REST_API_ROUTE', '/api/')
  /**
   * Hardcoded userId
   */
  .constant('USER_ID', '554fbe9866a5c53427d0b02b')
  .constant('TOKEN_STORAGE', '__token__')
  .constant('AUTH_SCHEMA', 'Bearer');
})(window.angular);