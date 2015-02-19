angular.module('jitsiLogs').filter('time', [function() {
    function pad(number) {
        return number < 10 ? "0" + number : number;
    }
    return function(time) {
        var date = new Date(time);
        return pad(date.getHours()) + ":" +
                pad(date.getMinutes()) + ":" +
                pad(date.getSeconds()) +
                date.getFullYear() + "-" +
                (pad(date.getMonth()  + 1)) + "-" +
                pad(date.getDate()) + " ";
    }
}]);