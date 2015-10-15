(function(){
    var app = angular.module('ShopAdmin');

    app.factory('$products', ['$categories', function($categories){
        function Products(){
            this.all = [
                {id: 1, name: 'Nikon D500', category: 5, price: 1000},
                {id: 2, name: 'iPhone 6', category: 7, price: 820},
                {id: 3, name: 'Ball', category: 16, price: 112}
            ];
            this.nextId = 4;
        }

        var def = Products.prototype;

        def.byId = function(id){
            for (var i=0; i<this.all.length; i++){
                if (this.all[i].id === id){
                    return this.all[i];
                }
            }
        };

        def.add = function(product){
            this.all.push({
                id: this.nextId,
                name: product.name,
                category: product.category,
                price: product.price,
            });
            this.nextId++;
        };

        def.remove = function(product){
            for (var i=0; i<this.all.length; i++){
                if (this.all[i].id === product.id){
                    this.all.splice(i, 1);
                    break;
                }
            }
        };

        def.categoryOf = function(productId){
            return $categories.byId(this.byId(productId).category);
        };

        return new Products();
    }]);

})();
