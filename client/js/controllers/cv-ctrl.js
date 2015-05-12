(function(ng) {
  ng.module('app')
  /**
   * Controls all application
   */
  .controller('CvCtrl', ['$scope', '$rootScope', '$log', 'UsersSvc', '_', 'USER_ID',
    function ($scope, $rootScope, $log, UsersSvc, _, USER_ID) {
      $scope.user = {
        skills: [],
        experience: [],
        education: [],
        languages: []
      };
      UsersSvc.getUser(USER_ID, function (user) {
        $scope.user = user;
        user.skills = user.skills || [];
        user.experience = user.experience || [];
        user.education = user.education || [];
        user.languages = user.languages || [];
      }, function (err) {
        $log.error(err);
      });
      
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