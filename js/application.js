(function(){
    var app = angular.module('ShopAdmin', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $routeProvider
            .when('/', {templateUrl: '/customers.html'})
            .when('/customers', {templateUrl: '/customers.html'})
            .when('/products', {templateUrl: '/products.html', controller: 'ProductsController', controllerAs: 'products'})
            .when('/cart/:id', {templateUrl: '/shopping_cart.html'});
    }]);

    app.controller('ApplicationController', ['$location', function($location){
        this.currentMenu = 'customers';

        this.changePath = function(path){
            $location.path(path);
            if (path === '/' || path === '/customers'){
                this.currentMenu = 'customers';
            } else if (path === '/products'){
                this.currentMenu = 'products';
            } else {
                this.currentMenu = 'none';
            }

        };

    }]);

    app.controller('ProductsController', ['$location', function($location){
        this.categories = [
            {id: 1, name: 'Alcohol', icon: 'glass'},
            {id: 2, name: 'Arts', icon: 'picture'},
            {id: 3, name: 'Baby', icon: 'baby-formula'},
            {id: 4, name: 'Books', icon: 'book'},
            {id: 5, name: 'Cameras', icon: 'camera'},
            {id: 6, name: 'Clothes', icon: 'tags'},
            {id: 7, name: 'Electronics', icon: 'phone'},
            {id: 8, name: 'Entertainment', icon: 'sunglasses'},
            {id: 9, name: 'Food ', icon: 'apple'},
            {id: 10, name: 'Furniture', icon: 'bed'},
            {id: 11, name: 'Home', icon: 'home'},
            {id: 12, name: 'Media', icon: 'film'},
            {id: 13, name: 'Office', icon: 'pushpin'},
            {id: 14, name: 'Software', icon: 'cd'},
            {id: 15, name: 'Tools', icon: 'wrench'},
            {id: 16, name: 'Toys', icon: 'knight'}
        ];
        this.newProduct = {name: undefined, category: 1, price: undefined};
        this.added = [
            {id: 1, name: 'Nikon D500', category: 5, price: 1000},
            {id: 2, name: 'iPhone 6', category: 7, price: 820}
        ];
        this.nextId = 3;
        this.currentlyEditable = undefined;
        this.editableBackup = {};

        this.category = function(id){
            for (var i=0; i<this.categories.length; i++){
                if (this.categories[i].id === id){
                    return this.categories[i];
                }
            }
        };

        this.setCategory = function(product, category){
            product.category = category.id;
        };

        this.add = function(){
            this.added.push({
                id: this.nextId,
                name: this.newProduct.name,
                category: this.newProduct.category,
                price: this.newProduct.price,
            });
            this.clearNewProduct();
            this.nextId++;
        };

        this.clearNewProduct = function(){
            this.newProduct = {name: undefined, category: 1, price: undefined};
        };

        this.edit = function(product){
            this.cancelEdit(this.currentlyEditable);
            this.currentlyEditable = product;
            this.editableBackup = {
                name: product.name,
                category: product.category,
                price: product.price,
            };
            product.editable = !product.editable;
        };

        this.cancelEdit = function(product){
            if (!product){
                return;
            }
            product.name = this.editableBackup.name;
            product.category = this.editableBackup.category;
            product.price = this.editableBackup.price;
            product.editable = !product.editable;
            this.editableBackup = {};
            this.currentlyEditable = undefined;
        };

        this.remove = function(id){
            for (var i=0; i<this.added.length; i++){
                if (this.added[i].id === id){
                    this.added.splice(i, 1);
                    break;
                }
            }
        };

    }]);

})();
