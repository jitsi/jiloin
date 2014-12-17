angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', function($scope, Database) {
        $scope.query = 'select * from conference_created';
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.response = response;
            });
        };
    }]);