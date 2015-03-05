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