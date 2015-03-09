'use strict';

var app = angular.module('jitsiLogs', ['ngRoute', 'ngCookies', 'n3-line-chart', 'angularUtils.directives.dirPagination']);
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html',
                controller: 'loginController'
            })
            .when('/conferences', {
                templateUrl: '/partials/conferences.html',
                controller: 'viewController'
            })
            .when('/endpoint_id/:endpoint_id', {
                templateUrl: '/partials/endpoint.html',
                controller: 'viewController'
            })
            .when('/conference_id/:conference_id', {
                templateUrl: '/partials/conference.html',
                controller: 'viewController'
            })
            .when('/room_jid/:room_jid', {
                templateUrl: '/partials/searchbyjid.html',
                controller: 'viewController'
            })
            .otherwise({
                redirectTo: '/'
            });


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);