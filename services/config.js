angular.module('jitsiLogs').service('Config', [function() {
    var config = {
        host: "fo.jitsi.net",
        port: "8086",
        database:"test_database2"
    };

    return config;
}]);