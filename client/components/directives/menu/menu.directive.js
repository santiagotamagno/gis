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
            controller: MenuCtrl,
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
    function MenuCtrl(dataService) {
        var vm = this;

        activate();

        function activate() {
            dataService.getData()
                .then(function (response) {
                    vm.data = response.data;
                });
        }
    }
})();
