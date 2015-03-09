/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').
    controller('loginController', ['$scope', '$location', 'Login', function($scope, $location, Login) {
        $scope.login = function() {
            if(Login.login($scope.username, $scope.password)) {

                $location.path('/conferences');
            } else {
                $scope.username = '';
                $scope.password = '';
                $scope.errorMessage = true;
            }
        };
}]);