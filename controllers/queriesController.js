angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams', 'QueryBuilder',
        function($scope, Database, $routeParams, QueryBuilder) {
        $scope.query = 'select * from conference_created';
        $scope.fieldName = 'conference_id';
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.response = response;
                $scope.errorMessage = '';
                console.log(response);
            }, function(response) {
                $scope.response = {};
                console.log(response);
                $scope.errorMessage = response;
            });
        };
        $scope.search = function() {
            if($scope.searchFor) {
                $scope.query = QueryBuilder.getQueryForValue($scope.fieldName, $scope.searchFor);
                $scope.makeQuery();
            }
        };
        if($routeParams.fieldName && $routeParams.fieldValue) {
            $scope.query = QueryBuilder.getQueryForValue($routeParams.fieldName, $routeParams.fieldValue);
        }
        $scope.makeQuery();
    }]);