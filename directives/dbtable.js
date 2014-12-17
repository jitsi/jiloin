angular.module('jitsiLogs').directive('dbTable', [function() {
    return {
        priority: 0,
        templateUrl: '../partials/dbtable.html',
        restrict: 'E',
        scope: {data: '=data'},
        link: function($scope) {
            $scope.formatTime = function(cell) {
                var date = new Date(cell);
                return date.getFullYear() + "-" +
                    date.getMonth() + "-" +
                    date.getDate() + " " +
                    date.getHours() + ":" +
                    date.getMinutes() + ":" +
                    date.getSeconds();
            }
        }
    };
}]);