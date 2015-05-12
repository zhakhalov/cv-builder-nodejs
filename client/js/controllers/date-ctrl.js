(function(ng) {
  ng.module('app')
  /**
   * Controls opening of datepicker 
   */
  .controller('DateCtrl', ['$scope',
    function ($scope) {
      /**
       * Initialize controller
       */
      $scope.initialize = function (field) {
        $scope.item[field] = new Date();
      }
      /**
       * Handle button [open] click
       */ 
      $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.isOpen = true;
      };
    }]);
})(window.angular);