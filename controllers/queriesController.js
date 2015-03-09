/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').controller('queriesController',
    ['$scope', '$location',
        function($scope, $location) {
        $scope.search = function() {
            if($scope.searchFor) {
                $location.path('/room_jid/' + $scope.searchFor);
            } else {
                $location.path('/conferences');
            }
        };
    }]);