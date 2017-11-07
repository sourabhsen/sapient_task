'use strict';
(function (window, angular, undefined) {

  function ProductListController($scope, $http, ProductListService, $modal) {
    var vm = this;
    vm.price = [];
    var getProductDetail = function () {
      ProductListService.getProductsInCarts().then(function (response) {
        vm.cart = response.data.productsInCart;
        vm.currency = response.data.productsInCart[0].c_currency;
        appDiscount();
        angular.forEach(vm.cart, function (element, i) {
          vm.price[i] = 1;
          element.p_updatedprice = vm.price[i] * element.p_price;
        });
        getInitalBillPrice();
      })
    };

    var appDiscount = function () {
      var totalItem = vm.cart.length;
      if (totalItem === 3) {
        vm.discountPrice = 5 / 100;
      }
      if (totalItem > 3 && totalItem <= 6) {
        vm.discountPrice = 10 / 100;
      }
      if (totalItem > 10) {
        vm.discountPrice = 25 / 100;
      }
    }

    var getInitalBillPrice = function () {
      angular.forEach(vm.cart, function (element, i) {
        vm.subTotal += element.p_updatedprice;
      });
      vm.promotionPrice = (vm.discountPrice * vm.subTotal);
      vm.estimateTotal = vm.subTotal - (vm.discountPrice * vm.subTotal);
    };

    vm.editToOpen = function (data) {
      var modalInstance = $modal.open({
        templateUrl: 'app/views/productlist/overlay.html',
        controller: function ($scope, $modalInstance, items) {
          $scope.items = items;
          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },

        resolve: {
          items: function () {
            return data;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {

      });
    };

    vm.updatePrice = function (index, price) {
      vm.subTotal = 0;
      var price = Math.floor(price);
      vm.cart[index].p_updatedprice = price * vm.cart[index].p_price;
      angular.forEach(vm.cart, function (element, i) {
        vm.subTotal += element.p_updatedprice;
      });
      vm.promotionPrice = (vm.discountPrice * vm.subTotal);
      vm.estimateTotal = vm.subTotal - (vm.discountPrice * vm.subTotal);
    }

    vm.onInit = function () {
      vm.subTotal = 0;
      vm.estimateTotal = 0;
      vm.discountPrice = 0;
      vm.promotionPrice = 0;
      getProductDetail();

    }

  }

  ProductListController.$inject = ['$scope', '$http', 'ProductListService', '$modal'];

  angular.module('shoppingApp')
    .controller('ProductListController', ProductListController);

})(window, window.angular);
