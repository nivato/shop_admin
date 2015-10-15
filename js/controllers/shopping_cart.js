(function(){
    var app = angular.module('ShopAdmin');

    app.controller('ShoppingCartController', ['$routeParams', '$categories', '$customers', '$products', function($routeParams, $categories, $customers, $products){
        this.id = $routeParams.customer_id;
        this.customer = $customers.byId($routeParams.customer_id);
        this.categories = $categories;
        this.products = $products;
        this.newPurchase = {product: this.products.all[0].id, amount: undefined};
        this.currentlyEditableIndex = undefined;
        this.editableBackup = {};

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
            this.newPurchase = {product: this.products.all[0].id, amount: undefined};
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
            return $customers.totalOfPurchase(purchase);
        };

        this.altogether = function(){
            return $customers.customerCheque(this.customer.id);
        };

    }]);

})();
