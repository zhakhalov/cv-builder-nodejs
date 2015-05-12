(function(ng) {
  ng.module('app')
  /**
   * Route prefix to API controllers
   */
  .constant('REST_API_ROOT', '/api')
  /**
   * Hardcoded userId
   */
  .constant('USER_ID', '554fbe9866a5c53427d0b02b');
})(window.angular);