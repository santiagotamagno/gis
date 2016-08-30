(function() {
    'use strict';

    angular
        .module('GisApp.dataService')
        .service('dataService', DataService);

    DataService.$inject = ['$http'];

    /* @ngInject */
    function DataService($http) {
        this.getData = getData;

        function getData(status) {
            return $http.get('/mocks/data.json');
        }
    }
})();
