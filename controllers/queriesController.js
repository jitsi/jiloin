angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams',
        'QueryBuilder', '$timeout', '$filter',
        function($scope, Database, $routeParams, QueryBuilder, $timeout, $filter) {
        $scope.query = QueryBuilder.getQueryForSeries('conference_created');
        $scope.fieldName = 'conference_id';
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.error = false;
                $scope.response = $filter('queryFilter')(response);
            }, function(response) {
                $scope.response = {};
                console.log(response);
                $scope.searchFor = response.responseText;
                $scope.error = true;
                $timeout(function(){
                    $scope.error = false;
                    $scope.searchFor = '';
                }, 3000);
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