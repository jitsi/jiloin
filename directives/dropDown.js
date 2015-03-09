/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').directive('dropDown',[function() {
    return {
        templateUrl: '/partials/dropdown.html',
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            setName: "=setname"
        }
    }
}]);