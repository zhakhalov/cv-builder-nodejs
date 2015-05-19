(function(ng) {
  ng.module('app')
  /**
   * Controls all application
   */
  .controller('CvCtrl', ['$scope', '$rootScope', '$log', 'AuthSvc', 'UsersSvc', '_', '$location',
    function ($scope, $rootScope, $log, AuthSvc, UsersSvc, _, $location) {
      if (!AuthSvc.isAuthenticated()) {
        $location.path('/');  
      } else {
        $scope.user = UsersSvc.user();
        $scope.user.skills = $scope.user.skills || [];
        $scope.user.experience = $scope.user.experience || [];
        $scope.user.education = $scope.user.education || [];
        $scope.user.languages = $scope.user.languages || [];  
      }
      
      // --- $rootScope.$on
      $rootScope.$on('collections:update', function () {
        $scope.isCollectionUpdated = true;
      });
      
      /**
       * Handle button [save] click
       */
      $scope.save = function () {
        $scope.pending = true;
        UsersSvc.saveUser($scope.user, function () {
          $scope.pending = false;
        });
      };
    }]);
})(window.angular);