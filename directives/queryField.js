angular.module('jitsiLogs').directive('queryField', [function() {
    return {
        templateUrl: 'partials/queryfield.html',
        restrict: 'E',
        scope: false,
        link: function() {
            console.log('querieess');
        }
    }
}]);