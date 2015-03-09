/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').filter('snakeToCamel', function() {
    return function(input) {
        return input.replace(/(\_\w)/g, function(match) {
            return match[1].toUpperCase();
        });
    };
});