'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngAnimate',
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'toaster',
    'dragAndDrop',
    'ngResource',
    'angularFileUpload'
]).
        config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
                $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
                $routeProvider.when('/manufacturer', {templateUrl: 'partials/manufacturer.html'});
                $routeProvider.when('/intelProcessors', {templateUrl: 'partials/intelProcessors.html', controller: 'intelProcessorsCtrl'});
                $routeProvider.when('/intelMotherboards', {templateUrl: 'partials/intelMotherboards.html', controller: 'intelMotherboardsCtrl'});
                $routeProvider.when('/mouse', {templateUrl: 'partials/mouse.html', controller: 'mouseCtrl'});
                $routeProvider.when('/keyboard', {templateUrl: 'partials/keyboard.html', controller: 'keyboardCtrl'});
                $routeProvider.when('/monitor', {templateUrl: 'partials/monitor.html', controller: 'monitorCtrl'});
                $routeProvider.when('/final', {templateUrl: 'partials/final.html', controller: 'finalCtrl'});
                $routeProvider.when('/drag', {templateUrl: 'partials/drag.html', controller: 'dragCtrl'});
                $routeProvider.when('/motherboard/compare', {templateUrl: 'partials/compareMotherboard.html'});
                $routeProvider.when('/processor/compare', {templateUrl: 'partials/compareProcessors.html'});
                $routeProvider.when('/gallery', {templateUrl: 'partials/gallery.html', controller: 'intelMotherboardsCtrl'});
                $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'dashCtrl'});
                $routeProvider.when('/upload', {templateUrl: 'partials/upload.html', controller: 'uploadCtrl'});



            }]);
