/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').filter('time', [function() {
    function pad(number) {
        return number < 10 ? "0" + number : number;
    }
    return function(time) {
        var date = new Date(time);
        return pad(date.getHours()) + ":" +
                pad(date.getMinutes()) + ":" +
                pad(date.getSeconds()) + " " +
                pad(date.getDate()) + "-" +
                (pad(date.getMonth()  + 1)) + "-" +
                date.getFullYear();
    }
}]);