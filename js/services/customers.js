(function(){
    var app = angular.module('ShopAdmin');

    app.factory('$customers', [function(){
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

        return new Customers();
    }]);

})();
