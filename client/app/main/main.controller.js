(function() {
    'use strict';

    angular
        .module('GisApp')
        .controller('MainCtrl', MainCtrl);

    // MainCtrl.$inject = ['dataService'];

    /* @ngInject */
    function MainCtrl() {
        var vm = this;

        vm.title = 'Villa Maria';

        activate();

        function activate() {

        }
    }
})();
