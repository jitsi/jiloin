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
                ssl: Config.ssl,
                daysAgo: 2 //time restriction for the database results
            })
        },
        query: function(query, successCallback, errorCallback) {
            if(!database) {
                $location.path('/');
                return;
            }
            $q.when(database.query(query)).then(successCallback, errorCallback);
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