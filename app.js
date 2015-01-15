'use strict';

var app = angular.module('jitsiLogs', ['ngRoute', 'n3-line-chart', 'angularUtils.directives.dirPagination']);
app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html',
                controller: 'loginController'
            })
            .when('/queries', {
                templateUrl: '/partials/queries.html',
                controller: 'queriesController'
            })
            .when('/:fieldName/:fieldValue', {
                templateUrl: '/partials/queries.html',
                controller: 'queriesController'
            })
            .otherwise({
                redirectTo: '/'
            });


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);