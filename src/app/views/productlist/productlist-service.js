'use strict';
(function(window, angular, undefined){

  function ProductListService($http){
    var service = {};

    service.getProductsInCarts = function(params) {
       return $http.get('/app/data/cart.json');
    }

    
    return service;

  }

  ProductListService.$inject = ['$http'];

  angular.module('shoppingApp')
  .service('ProductListService', ProductListService);

})(window, angular);
