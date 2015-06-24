/*
/*
 * Jiloin, Jitsi Logging Interface
 *
 *
 * Copyright @ 2015 Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
