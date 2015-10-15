(function(){
    var app = angular.module('ShopAdmin');

    app.controller('CustomersController', ['$customers', function($customers){
        this.newCustomer = {first_name: undefined, last_name: undefined};
        this.service = $customers;
        this.added = $customers.all;
        this.currentlyEditable = undefined;
        this.editableBackup = {};

        this.add = function(){
            $customers.add(this.newCustomer);
            this.clearNewCustomer();
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

        this.remove = function(customer){
            $customers.remove(customer);
        };

    }]);

})();
