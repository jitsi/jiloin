angular.module('jitsiLogs').filter('tableName', function() {
   return function(tableName) {
       if(tableName === 'endpoint_created') {
           return "PARTICIPANTS"
       } else {
           return tableName.replace('_', ' ');
       }
   }
});