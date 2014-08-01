'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.services', []).
        factory('getMotherboards', ['$resource', function($resource) {
                return $resource('/api/getMotherboards', {}, {
                });
            }])
        .factory('getProcessors', ['$resource', function($resource) {
                return $resource('/api/getProcessors', {}, {
                });
            }])
        .factory('getMouse', ['$resource', function($resource) {
                return $resource('/api/getMouse', {}, {
                });
            }])
        .factory('getMonitors', ['$resource', function($resource) {
                return $resource('/api/getMonitors', {}, {
                });
            }])
        .factory('getKeyboards', ['$resource', function($resource) {
                return $resource('/api/getKeyboards', {}, {
                });
            }])
        .factory('getStatus', ['$resource', function($resource) {
                return $resource('/api/getStatus', {}, {
                });
            }])
        .factory('getOrders', ['$resource', function($resource) {
                return $resource('/api/getOrders', {}, {
                });
            }])
        .factory('deliverOrderService', ['$resource', function($resource) {
                return $resource('/api/deliver', {}, {
                    
                });
            }])
        .factory('addProductService', ['$resource', function($resource) {
                return $resource('/api/addProduct', {}, {
                });
            }])
        .factory('addOrderService', ['$resource', function($resource) {
                return $resource('/api/addOrder', {}, {
                });
            }])
         .factory('nodemailer', ['$resource', function($resource) {
                return $resource('/api/nodemail', {}, {
                    send : {method:'GET'}
                });
            }]);