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
                kml: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function MenuCtrl(dataService) {
        var vm = this;

        vm.setKml = setKml;

        activate();

        function activate() {
            dataService.getData()
                .then(function (response) {
                    vm.data = response.data;
                });
        }

        function setKml(value) {
            vm.kml = value;
        }
    }
})();
