angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams',
        'QueryBuilder', '$timeout', '$filter', 'Charts',
        function($scope, Database, $routeParams, QueryBuilder, $timeout, $filter, Charts) {
        $scope.query = "select * from conference_created, conference_room";
        $scope.fieldName = 'conference_name';
        //$scope.options = Charts.getOptions();

        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.error = false;
                $scope.response = $filter('queryFilter')(response, $scope.fieldName);
                $scope.charts = Charts.getChartData(response);
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
        }
        $scope.makeQuery();
    }]);