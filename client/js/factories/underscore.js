(function(ng, _) {
  ng.module('app')
  /**
   * Wrapper for UnderscoreJS
   */
  .factory('_', [
    function () {
      return _;
    }]);
})(window.angular, window._);