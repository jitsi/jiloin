angular.module('jitsiLogs').controller('queriesController',
    ['$scope', 'Database', '$routeParams', 'QueryBuilder',
        function($scope, Database, $routeParams, QueryBuilder) {
        $scope.search = function() {
            $scope.filter = '';
            $scope.query = QueryBuilder.getQueryForValue('room_jid', $scope.searchFor);
            $scope.makeQuery();
        };
    }]);