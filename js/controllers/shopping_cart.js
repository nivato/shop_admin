(function(){
    var app = angular.module('ShopAdmin');

    app.controller('ShoppingCartController', ['$routeParams', '$categories', '$customers', function($routeParams, $categories, $customers){
        this.id = $routeParams.customer_id;
        this.customer = $customers.byId($routeParams.customer_id);
        this.categories = $categories;
        this.products = [
            {id: 1, name: 'Nikon D500', category: 5, price: 1000},
            {id: 2, name: 'iPhone 6', category: 7, price: 820},
            {id: 3, name: 'Jack Daniels', category: 1, price: 134},
            {id: 4, name: 'Snickers', category: 9, price: 0.7}
        ];
        this.newPurchase = {product: 1, amount: undefined};
        // this.customer.cart = [
            // {product: 1, amount: 3},
            // {product: 2, amount: 5},
            // {product: 3, amount: 2},
            // {product: 4, amount: 1}
        // ];
        this.currentlyEditableIndex = undefined;
        this.editableBackup = {};

        this.product = function(id){
            for (var i=0; i<this.products.length; i++){
                if (this.products[i].id === id){
                    return this.products[i];
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
            var sum = 0,
            purchase;
            for (var i=0; i<this.customer.cart.length; i++){
                purchase = this.customer.cart[i];
                sum += this.total(purchase);
            }
            return sum;
        };

    }]);

})();
