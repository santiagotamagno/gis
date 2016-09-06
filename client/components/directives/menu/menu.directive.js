(function() {
    'use strict';

    angular
        .module('GisApp.menu')
        .directive('ngMenu', NgMenu);

    NgMenu.$inject = ['dataService', 'UsersService'];

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
                kml: '=',
                title: '=',
                zoom: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function MenuCtrl(dataService, UsersService) {
        var vm = this;

        vm.setKml = setKml;

        activate();

        function activate() {
            dataService.getData()
                .then(function (response) {
                    vm.data = response.data;
                    if (UsersService.isLoggedIn()) {
                        dataService.getDataLoggedIn()
                            .then(function (response) {
                                for (var value of response.data) {
                                    vm.data.push(value);
                                }
                            });
                    }
                });
        }

        function setKml(value, section, title, zoom) {
            console.log(zoom);
            vm.title = `${section}  - ${title}`;
            vm.kml = value;
            vm.zoom = zoom;
        }
    }
})();
