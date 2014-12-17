'use strict';

var app = angular.module('jitsiLogs', ['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/login.html',
                controller: 'loginController'
            }).
            when('/queries', {
                templateUrl: '/partials/queries.html',
                controller: 'queriesController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);