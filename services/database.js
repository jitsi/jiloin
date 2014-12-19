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
                database: Config.database
            })
        },
        query: function(query, callback) {
            if(!database) {
                $location.path('/');
                return;
            }
            $q.when(database.query(query)).then(callback);
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