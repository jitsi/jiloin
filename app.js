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
