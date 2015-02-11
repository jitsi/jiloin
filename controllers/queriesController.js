angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams',
        'QueryBuilder', '$timeout', '$filter', 'Stats',
        function($scope, Database, $routeParams, QueryBuilder, $timeout, $filter, Stats) {
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.error = false;
                $scope.response = response;
                $scope.response = $filter('queryFilter')(response, $scope.fieldName);
                $scope.data = Stats.getStatsData(response);
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
            $scope.filter = '';
            $scope.query = QueryBuilder.getQueryForValue('room_jid', $scope.searchFor);
            $scope.makeQuery();
        };
        if($routeParams.fieldName && $routeParams.fieldValue) {
            $scope.query = QueryBuilder.getQueryForValue($routeParams.fieldName, $routeParams.fieldValue);
            $scope.fieldName = $routeParams.fieldName;
        } else {
            $scope.query = QueryBuilder.getInitialQuery();
            $scope.fieldName = 'conference_room';
        }
        $scope.makeQuery();
    }]);