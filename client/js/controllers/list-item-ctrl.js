(function(ng) {
  ng.module('app')
  /**
   * Controlls list items in Skill, Experience, Education, Language collections
   */
  .controller('ListItemCtrl', ['$scope', '$rootScope', 'EditSvc','_', '$modal',
    function ($scope, $rootScope, EditSvc, _, $modal) {
      var self = this;
      /**
       * Initialize controller
       */
       $scope.initialize = function (templateUrl, collectionName) {
         self.templateUrl = templateUrl;
         self.collectionName = collectionName;
       };
      /**
       * Handle [edit] button click
       */ 
      $scope.edit = function () {
        var modal = $modal.open({ templateUrl: self.templateUrl, size: 'lg' });
        EditSvc.model = $scope.item;
        EditSvc.close = function () {
          modal.dismiss();
        };
      };
      /**
       * Handle [remove] button click
       */ 
      $scope.remove = function () {
        $scope.$parent.user[self.collectionName] = _.without($scope.$parent.user[self.collectionName], $scope.item);
        $rootScope.$emit('collections:update');
      };
    }]);
})(window.angular);    