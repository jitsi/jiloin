angular.module('jitsiLogs').filter('snakeToCamel', function() {
    return function(input) {
        return input.replace(/(\_\w)/g, function(match) {
            return match[1].toUpperCase();
        });
    };
});