/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').
    controller('viewController',
    ['$scope', 'Stats', '$timeout', '$routeParams', '$location', 'QueryBuilder', 'Database', '$filter', 'Login',
        function($scope, Stats, $timeout, $routeParams, $location, QueryBuilder, Database, $filter, Login) {

    $scope.fieldName = $location.path().split('/')[1];
    if($routeParams[$scope.fieldName]) {
        $scope.query = QueryBuilder.getQueryForValue($scope.fieldName,
            $routeParams[$scope.fieldName], $scope.fieldName === 'room_jid');
    } else {
        $scope.query = QueryBuilder.getQueryForSeries('conference_room');
    }
    $scope.makeQuery = function() {
        function success(response) {
            $scope.error = false;
            $scope.response = $filter('query')(response, $scope.fieldName);
        }
        function error(response) {
            $scope.response = {};
            console.log(response);
            $scope.searchFor = response.responseText;
            $scope.error = true;
            $timeout(function(){
                $scope.error = false;
                $scope.searchFor = '';
            }, 3000);
        }
        if(!Login.isLoggedIn()) {
            if(!Login.login()) {
                $location.path('/');
                return;
            }
        }
        Database.query($scope.query, success, error);
        $scope.loadAdditionalData = function(query, successCallback, errorCallback) {
            $scope.loading = true;
            Database.query(query, function(response) {
                successCallback(response);
                $scope.loading = false;
            }, function(response) {
                errorCallback(response);
                $scope.loading = false;
            });
        };
        if($scope.fieldName === 'endpoint_id') {
            var statsQuery = "select *" +
                " from peer_connection_stats " +
                "where endpoint_id='" + $routeParams[$scope.fieldName] + "'" +
                " and time > now() - 10d";
            $scope.loadAdditionalData(statsQuery, function(response) {
                $scope.data = Stats.getStatsData(response);
            }, function(response) {
                console.log(response);
            });
        } else if($scope.fieldName === 'conference_id') {
            var dataQuery = "select * " +
                "from endpoint_created,channel_created,content_created,content_expired" +
                " where conference_id ='" + $routeParams[$scope.fieldName] + "'";
            $scope.loadAdditionalData(dataQuery,function(response) {
                $scope.info = $filter('query')(response, 'conference_info');
            }, function(response) {
                console.log(response);
            });
        }
    };
    $scope.makeQuery();
}]);