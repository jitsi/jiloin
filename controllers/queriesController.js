angular.module('jitsiLogs').
    controller('queriesController', ['$scope', 'Database', '$routeParams',
        function($scope, Database, $routeParams) {
        $scope.query = 'select * from conference_created';
        $scope.queries = {
            conference_id: 'select * ' +
                           'from conference_created, conference_room, endpoint_created, conference_expired ' +
                           'where conference_id=',
            endpoint_id: 'select * ' +
                         'from endpoint_created, peer_connection_stats, channel_created ' + //add endpoint_display_name when integrated with ficofo
                         'where endpoint_id='
        };
        $scope.makeQuery = function() {
            Database.query($scope.query, function(response) {
                $scope.response = response;
            });
        };
        if($routeParams.fieldName && $routeParams.fieldValue) {
            $scope.query = $scope.queries[$routeParams.fieldName] + "'" + $routeParams.fieldValue + "'";
        }
        $scope.makeQuery();
    }]);