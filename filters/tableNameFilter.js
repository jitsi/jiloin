/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').filter('tableName', function() {
   return function(tableName) {
        return tableName.split('_').join(' ');
   }
});