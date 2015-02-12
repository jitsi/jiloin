angular.module('jitsiLogs').controller('queriesController',
    ['$scope', '$location',
        function($scope, $location) {
        $scope.search = function() {
            $location.path('/room_jid/' + $scope.searchFor);
        };
    }]);