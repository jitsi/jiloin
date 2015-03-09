/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').service('Database',['Config', '$q', '$location',
    function(Config, $q, $location) {
    var database;
    var databases;
    return {
        connect: function(username, password) {
            database = new InfluxDB({
                host: Config.host,
                port: Config.port,
                username: username,
                password: password,
                database: Config.database,
                ssl: Config.ssl
            });
        },
        query: function(query, successCallback, errorCallback) {
            if(!database) {
               return false;
            }
            $q.when(database.query(query)).then(successCallback, errorCallback);
            return true;
        },
        getDatabases : function() {
            if(!database) {
                $location.path('/');
                return;
            }
            $q.when(database.getDatabases()).then(function(response) {
                    databases = response;
                }
            )
        }
    }
}]);