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
                return date.getFullYear() + "-" +
                    date.getMonth() + "-" +
                    date.getDate() + " " +
                    date.getHours() + ":" +
                    date.getMinutes() + ":" +
                    date.getSeconds();
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