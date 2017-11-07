'use strict';
(function(window, angular, undefined){

  function ProductListController($scope,$http,ProductListService){
    var vm = this;
    
    var getProductDetail = function() {
         ProductListService.getProductsInCarts().then(function(response) {
           vm.cart = response.data.productsInCart;
           vm.currency = response.data.productsInCart[0].c_currency;
         })
    }
    vm.onInit = function(){
      getProductDetail();
    }

  }

  ProductListController.$inject = ['$scope','$http','ProductListService'];

  angular.module('shoppingApp')
  .controller('ProductListController', ProductListController);

})(window, window.angular);
