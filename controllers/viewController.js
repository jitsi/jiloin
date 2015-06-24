/*
/*
 * Jiloin, Jitsi Logging Interface
 *
 *
 * Copyright @ 2015 Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
