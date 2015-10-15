(function(){
    var app = angular.module('ShopAdmin');

    app.factory('$customers', ['$products', function($products){
        function Customers(){
            this.all = [
                {id: 1, first_name: 'Nazar', last_name: 'Ivato', cart: []},
                {id: 2, first_name: 'Jack', last_name: 'Sparrow', cart: []},
                {id: 3, first_name: 'Nina', last_name: 'Pits', cart: []}
            ];
            this.nextId = 4;
        }

        var def = Customers.prototype;

        def.byId = function(id){
            for (var i=0; i<this.all.length; i++){
                if (this.all[i].id == id){
                    return this.all[i];
                }
            }
        };

        def.add = function(customer){
            this.all.push({
                id: this.nextId,
                first_name: customer.first_name,
                last_name: customer.last_name,
                cart: []
            });
            this.nextId++;
        };

        def.remove = function(customer){
            for (var i=0; i<this.all.length; i++){
                if (this.all[i].id === customer.id){
                    this.all.splice(i, 1);
                    break;
                }
            }
        };

        def.totalOfPurchase = function(purchase){
            var product = $products.byId(purchase.product);
            return product.price * purchase.amount;
        };

        def.customerCheque = function(customerId){
            var sum = 0,
            customer = this.byId(customerId),
            purchase;
            for (var i=0; i<customer.cart.length; i++){
                purchase = customer.cart[i];
                sum += this.totalOfPurchase(purchase);
            }
            return sum;
        };

        return new Customers();
    }]);

})();
