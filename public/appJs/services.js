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
         .factory('addProductService', ['$resource', function($resource) {
                return $resource('/api/addProduct', {}, {
                });
            }]);