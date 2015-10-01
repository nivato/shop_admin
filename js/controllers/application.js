(function(){
    var app = angular.module('ShopAdmin');

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

})();
