(function(ng) {
  ng.module('app')
  /**
   * Controlls list items in Skill, Experience, Education, Language collections
   */
  .controller('AddListItemCtrl', ['$scope', '$rootScope', '_', '$modal',
    function ($scope, $rootScope, _, $modal) {
      var self = this;
      $scope.item = {};
      /**
       * Initialize controller
       * @param collection {Array} Collection, which item will be added to
       */
      $scope.initialize = function (collection) {
        self.collection = collection;
      };
      /**
       * Handle [add] button click
       */ 
      $scope.add = function () {
        $scope.user[self.collection].push($scope.item);
        $scope.item = {};
        $scope.form.$setPristine();
        $rootScope.$emit('collections:update');
      };
    }]);
})(window.angular);    