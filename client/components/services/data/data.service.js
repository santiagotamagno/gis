(function() {
    'use strict';

    angular
        .module('GisApp.dataService')
        .service('dataService', DataService);

    DataService.$inject = ['$http'];

    /* @ngInject */
    function DataService($http) {
        this.getData = getData;
        this.getDataLoggedIn = getDataLoggedIn;

        function getData() {
            return $http.get('/mocks/data.json');
        }

        function getDataLoggedIn() {
            return $http.get('/mocks/data-login.json');
        }
    }
})();
