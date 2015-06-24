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

angular.module('jitsiLogs').service('Login', ['$cookieStore', 'Database',
    function($cookies, Database) {
    var loggedIn = false;
    return {
        login: function(username, password) {
            username = username || $cookies.get('influxUsername');
            password = password || $cookies.get('influxPassword');
            if(!username || !password) {
                loggedIn = false;
                return false;
            } else {
                var expires = new Date();
                expires.setMinutes(expires.getMinutes() + 30);
                $cookies.put('influxUsername', username, {expires: expires});
                $cookies.put('influxPassword', password, {expires: expires});
            }
            Database.connect(username, password);
            loggedIn = true;
            return true;
        },
        isLoggedIn: function() {
            return loggedIn;
        }
    }
}]);
