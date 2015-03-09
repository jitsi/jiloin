/*
 * Jiloin, Jitsi Logging Interface
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 *
 * @author Svetlana Velichkova
 */

angular.module('jitsiLogs').service('Config', [function() {
    var config = {
        host: "db.fo.jitsi.net",
        port: "443", // requires webserver config to proxy to the appropriate place...
        database:"test_database2",
        ssl: true,
        daysAgo: 2
    };

    return config;
}]);
