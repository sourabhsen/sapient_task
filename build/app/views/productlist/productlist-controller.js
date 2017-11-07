'use strict';
(function (window, angular, undefined) {

  function ProductListController($scope, $http, ProductListService) {
    var vm = this;
    vm.price = [];
    var getProductDetail = function getProductDetail() {
      ProductListService.getProductsInCarts().then(function (response) {
        vm.cart = response.data.productsInCart;
        vm.currency = response.data.productsInCart[0].c_currency;
        angular.forEach(vm.cart, function (element, i) {
          vm.price[i] = 1;
          element.p_updatedprice = vm.price[i] * element.p_price;
        });
      });
    };

    vm.updatePrice = function (index, price) {
      var price = Math.floor(price);
      vm.cart[index].p_updatedprice = price * vm.cart[index].p_price;
    };

    vm.onInit = function () {
      getProductDetail();
    };
  }

  ProductListController.$inject = ['$scope', '$http', 'ProductListService'];

  angular.module('shoppingApp').controller('ProductListController', ProductListController);
})(window, window.angular);