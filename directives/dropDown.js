angular.module('jitsiLogs').directive('dropDown',[function() {
    return {
        templateUrl: '/partials/dropdown.html',
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            setName: "=setname"
        }
    }
}]);