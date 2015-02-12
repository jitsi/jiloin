angular.module('jitsiLogs').
    controller('viewController',
    ['$scope', 'Stats', '$timeout', '$routeParams', '$location', 'QueryBuilder', 'Database', '$filter',
        function($scope, Stats, $timeout, $routeParams, $location, QueryBuilder, Database, $filter) {

    $scope.fieldName = $location.path().split('/')[1];
    if($routeParams[$scope.fieldName]) {
        $scope.query = QueryBuilder.getQueryForValue($scope.fieldName,
            $routeParams[$scope.fieldName]);
    } else {
        $scope.query = QueryBuilder.getQueryForSeries('conference_room');
    }
    $scope.makeQuery = function() {
        Database.query($scope.query, function(response) {
            $scope.error = false;
            $scope.response = $filter('queryFilter')(response, $scope.fieldName);
            $scope.data = Stats.getStatsData($scope.response);
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
    $scope.makeQuery();
}]);