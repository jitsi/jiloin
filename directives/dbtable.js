angular.module('jitsiLogs').directive('dbTable', ['QueryBuilder', function(QueryBuilder) {
    return {
        priority: 0,
        templateUrl: '../partials/dbtable.html',
        restrict: 'E',
        scope: {
            data: '=data'
        },
        link: function($scope) {
            $scope.formatTime = function (cell) {
                var date = new Date(cell);
                function pad(number) {
                    return number < 10 ? "0" + number : number;
                }
                return date.getFullYear() + "-" +
                    (date.getMonth()  + 1) + "-" +
                    date.getDate() + " " +
                    pad(date.getHours()) + ":" +
                    pad(date.getMinutes()) + ":" +
                    pad(date.getSeconds());
            };
            $scope.isLink = function($index) {
                return QueryBuilder.hasFieldsFor($scope.data.columns[$index]);
            };
            $scope.getLink = function(cell, $index) {
                return '/' + $scope.data.columns[$index].replace('/', '%2F') +
                    '/' + cell.replace('/', '%2F');
            }
        }
    }
}]);