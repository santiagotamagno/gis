(function() {
    'use strict';

    angular
        .module('GisApp.menu')
        .directive('ngMenu', NgMenu);

    NgMenu.$inject = ['dataService'];

    /* @ngInject */
    function NgMenu() {
        var directive = {
            bindToController: true,
            templateUrl: 'components/directives/menu/menu.html',
            controller: menuCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function menuCtrl(dataService) {
        var vm = this;

        dataService.getData()
            .then(function (response) {
                vm.data = response.data;
            });
    }
})();
