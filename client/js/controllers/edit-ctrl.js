(function(ng) {
  ng.module('app')
  /**
   * Controlls list items in Skill, Experience, Education, Language collections
   */
  .controller('EditCtrl', ['$scope', '$rootScope', 'EditSvc', '_', 
    function ($scope, $rootScope, EditSvc, _) {
      $scope.item = {};
      _.each(EditSvc.model, function (value, key) { $scope.item[key] = value; });
      /**
       * Handle [add] button click
       * @param listName {String} Name of collection which item will be added to
       * @param item {Object} Collection item 
       */ 
      $scope.save = function () {
        _.each(EditSvc.model, function (value, key) { EditSvc.model[key] = $scope.item[key]; });
        $rootScope.$emit('collections:update');
        EditSvc.close();
      };
      /**
       * Handle [remove] button click
       * @param listName {String} Name of collection which item will be removed from
       * @param item {Object} Collection item 
       */ 
      $scope.cancel = function () {
        EditSvc.close();
      };
    }]);
})(window.angular);    