angular.module('jitsiLogs').directive('dbTable', ['$filter', function($filter) {
    return {
        priority: 0,
        templateUrl: '../partials/dbtable.html',
        restrict: 'E',
        scope: {data: '=data',
                queries: '=queries'
        },
        link: function($scope) {
            $scope.formatTime = function (cell) {
                var date = new Date(cell);
                return date.getFullYear() + "-" +
                    date.getMonth() + "-" +
                    date.getDate() + " " +
                    date.getHours() + ":" +
                    date.getMinutes() + ":" +
                    date.getSeconds();
            };
            $scope.isLink = function($index) {
                return $scope.queries[$scope.data.columns[$index]];
            };
            $scope.getLink = function(cell, $index) {
                return '/' + $scope.data.columns[$index] + '/' + cell;
            }
        }
    }
}]);