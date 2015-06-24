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

angular.module('jitsiLogs').directive('dbTable', ['QueryBuilder', '$location', '$filter',
    function(QueryBuilder, $location, $filter) {
    return {
        priority: 0,
        templateUrl: '../partials/dbtable.html',
        restrict: 'E',
        scope: {
            data: '=data'
        },
        link: function($scope) {

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
            };
            var ordered = QueryBuilder.getCorrectColumnsOrder($scope.data.name);
            if(!ordered) {
                ordered = angular.copy($scope.data.columns);
                ordered.splice(0, 1);
            }
            $scope.columnsOrder = [];
            for(i = 0; i < ordered.length; i++) {
                for(var j = 0; j < $scope.data.columns.length; j++) {
                    if($scope.data.columns[j] === ordered[i]) {
                        $scope.columnsOrder.push(j);
                        break;
                    }
                }
            }
        }
    }
}]);
