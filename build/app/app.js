'use strict';
(function (window, angular, undefined) {

  angular.module('shoppingApp', ['ui.bootstrap', 'thumbnail', 'ui.router', 'ngDialog']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /overview
    $urlRouterProvider.otherwise('/productsInCart');

    $stateProvider.state('productsInCart', {
      url: '/productsInCart',
      views: {
        'main': {
          templateUrl: 'app/views/productlist/productlist.html'
        },
        'header': {
          templateUrl: 'app/views/header.html'
        }
      }

    });
  }]).controller('AppController', [function () {}]);
})(window, window.angular);