angular.module('jitsiLogs').
    controller('loginController', ['$scope', '$location', 'Database', function($scope, $location, Database) {
        $scope.login = function() {
            Database.connect($scope.username, $scope.password);
            $location.path('/conferences');
        };
}]);