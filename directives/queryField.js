/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').directive('queryField', [function() {
    return {
        templateUrl: 'partials/queryfield.html',
        restrict: 'E',
        scope: false,
        link: function() {
            console.log('querieess');
        }
    }
}]);