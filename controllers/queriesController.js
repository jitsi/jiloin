angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams', 'QueryBuilder',
        function($scope, Database, $routeParams, QueryBuilder) {
        $scope.query = 'select * from conference_created';
        $scope.fieldName = 'conference_id';
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                if(response.length === 0) {
                    $scope.message = "Sorry, we couldn't find anything...";
                } else {
                    $scope.message = '';
                }
                $scope.error = false;
                $scope.response = response;
            }, function(response) {
                $scope.response = {};
                console.log(response);
                $scope.message = response.responseText;
                $scope.error = true;
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