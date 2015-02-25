angular.module('jitsiLogs').filter('tableName', function() {
   return function(tableName) {
        return tableName.split('_').join(' ');
   }
});