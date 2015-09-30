(function(){
    var app = angular.module('ShopAdmin', ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $routeProvider
            .when('/', {templateUrl: '/customers.html', controller: 'CustomersController', controllerAs: 'customers'})
            .when('/customers', {templateUrl: '/customers.html', controller: 'CustomersController', controllerAs: 'customers'})
            .when('/products', {templateUrl: '/products.html', controller: 'ProductsController', controllerAs: 'products'})
            .when('/cart/:id', {templateUrl: '/shopping_cart.html', controller: 'ShoppingCartController', controllerAs: 'cart'});
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

        this.saveEdit = function(product){
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

    app.controller('CustomersController', ['$location', function($location){
        this.newCustomer = {first_name: undefined, last_name: undefined};
        this.added = [
            {id: 1, first_name: 'Nazar', last_name: 'Ivato'},
            {id: 2, first_name: 'Jack', last_name: 'Sparrow'}
        ];
        this.nextId = 3;
        this.currentlyEditable = undefined;
        this.editableBackup = {};

        this.add = function(){
            this.added.push({
                id: this.nextId,
                first_name: this.newCustomer.first_name,
                last_name: this.newCustomer.last_name,
            });
            this.clearNewCustomer();
            this.nextId++;
        };

        this.clearNewCustomer = function(){
            this.newCustomer = {first_name: undefined, last_name: undefined};
        };

        this.edit = function(customer){
            this.cancelEdit(this.currentlyEditable);
            this.currentlyEditable = customer;
            this.editableBackup = {
                first_name: customer.first_name,
                last_name: customer.last_name,
            };
            customer.editable = !customer.editable;
        };

        this.cancelEdit = function(customer){
            if (!customer){
                return;
            }
            customer.first_name = this.editableBackup.first_name;
            customer.last_name = this.editableBackup.last_name;
            customer.editable = !customer.editable;
            this.editableBackup = {};
            this.currentlyEditable = undefined;
        };

        this.saveEdit = function(customer){
            customer.editable = !customer.editable;
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

    app.controller('ShoppingCartController', ['$location', function($location){
        this.customer = {id: 1, first_name: 'Nazar', last_name: 'Ivato'};
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
        this.products = [
            {id: 1, name: 'Nikon D500', category: 5, price: 1000},
            {id: 2, name: 'iPhone 6', category: 7, price: 820},
            {id: 3, name: 'Jack Daniels', category: 1, price: 134},
            {id: 4, name: 'Snickers', category: 9, price: 0.7}
        ];
        this.newPurchase = {product: 1, amount: undefined};
        this.customer.cart = [
            {product: 1, amount: 3},
            {product: 2, amount: 5},
            {product: 3, amount: 2},
            {product: 4, amount: 1}
        ];
        this.currentlyEditableIndex = undefined;
        this.editableBackup = {};

        this.product = function(id){
            for (var i=0; i<this.products.length; i++){
                if (this.products[i].id === id){
                    return this.products[i];
                }
            }
        };

        this.category = function(id){
            for (var i=0; i<this.categories.length; i++){
                if (this.categories[i].id === id){
                    return this.categories[i];
                }
            }
        };

        this.setProduct = function(purchase, product){
            purchase.product = product.id;
        };

        this.add = function(){
            this.customer.cart.push({
                product: this.newPurchase.product,
                amount: this.newPurchase.amount,
            });
            this.clearNewPurchase();
        };

        this.clearNewPurchase = function(){
            this.newPurchase = {product: 1, amount: undefined};
        };

        this.edit = function(index){
            var purchase = this.customer.cart[index];
            this.cancelEdit(this.currentlyEditableIndex);
            this.currentlyEditableIndex = index;
            this.editableBackup = {
                amount: purchase.amount,
            };
            purchase.editable = !purchase.editable;
        };

        this.cancelEdit = function(index){
            var purchase = this.customer.cart[index];
            if (!purchase){
                return;
            }
            purchase.amount = this.editableBackup.amount;
            purchase.editable = !purchase.editable;
            this.editableBackup = {};
            this.currentlyEditableIndex = undefined;
        };

        this.saveEdit = function(index){
            var purchase = this.customer.cart[index];
            purchase.editable = !purchase.editable;
            this.editableBackup = {};
            this.currentlyEditableIndex = undefined;
        };

        this.remove = function(index){
            this.customer.cart.splice(index, 1);
        };

        this.total = function(purchase){
            var product = this.product(purchase.product);
            return product.price * purchase.amount;
        };

        this.altogether = function(){
            var sum = 0, purchase;
            for (var i=0; i<this.customer.cart.length; i++){
                purchase = this.customer.cart[i];
                sum += this.total(purchase);
            }
            return sum;
        };

    }]);

})();
