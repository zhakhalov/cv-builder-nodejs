(function(ng, _) {
  ng.module('app', [
    'ui.sortable',
    'ui.bootstrap',
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'mgcrea.ngStrap.datepicker',
    'ngMessages',
    'ngResource',
    'directives.inputMatch'
  ])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
      .when('/cv', {
        templateUrl: 'templates/cv.html',
        controller: 'CvCtrl'
      });
      $locationProvider.html5Mode(true);
    }]);
})(window.angular, window._);