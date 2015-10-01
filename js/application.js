(function(){
    var app = angular.module('ShopAdmin', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $routeProvider
            .when('/', {templateUrl: '/customers.html', controller: 'CustomersController', controllerAs: 'customers'})
            .when('/customers', {templateUrl: '/customers.html', controller: 'CustomersController', controllerAs: 'customers'})
            .when('/products', {templateUrl: '/products.html', controller: 'ProductsController', controllerAs: 'products'})
            .when('/cart/:customer_id', {templateUrl: '/shopping_cart.html', controller: 'ShoppingCartController', controllerAs: 'cart'});
    }]);

})();
