angular.module('jitsiLogs').directive('dbTable', ['QueryBuilder', '$location',
    function(QueryBuilder, $location) {
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
            $scope.goTo = function($index) {
                $location.path($scope.getLink($index));
            };
            var clickableField = QueryBuilder.getClickableField($scope.data.name);
            for(var i = 0; i < $scope.data.columns.length; i++) {
                if($scope.data.columns[i] === clickableField) {
                    $scope.linkColumn = i;
                }
            }
            $scope.getLink = function($index) {
                return '/' + $scope.data.columns[$scope.linkColumn].replace('/', '%2F') +
                    '/' + $scope.data.points[$index][$scope.linkColumn].replace('/', '%2F');
            }
        }
    }
}]);