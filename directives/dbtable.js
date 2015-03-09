/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
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