(function(){
    var app = angular.module('ShopAdmin');

    app.factory('$categories', [function(){
        function Categories(){
            this.all = [
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
        }

        Categories.prototype.byId = function(id){
            for (var i=0; i<this.all.length; i++){
                if (this.all[i].id === id){
                    return this.all[i];
                }
            }
        };

        return new Categories();
    }]);

})();
