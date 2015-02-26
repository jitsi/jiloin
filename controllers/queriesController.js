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