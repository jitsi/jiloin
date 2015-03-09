/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').filter('sanitize', ['$sce', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    };
}]);