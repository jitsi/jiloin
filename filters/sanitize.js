angular.module('jitsiLogs').filter('sanitize', ['$sce', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    };
}]);