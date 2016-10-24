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
                options: '='
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
        vm.states = {};

        activate();

        function activate() {
            vm.colors = setColors();

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

        function setKml(kml, section, title, zoom, heatMap) {
            vm.options = {
                title: `${section}  - ${title}`,
                kml: kml,
                zoom: zoom,
                heatMap: heatMap
            };
            vm.states.title = title;
        }

        function setColors() {
            var colors = [
                'aqua-border',
                'blue-border',
                'green-border',
                'red-border',
                'yellow-border'
            ];
            var aColors = [];
            var index = 0;

            for (var i = 0; i < 100; i++) {
                if (i % 5 === 0) {
                    index = 0;
                }
                aColors.push(colors[index]);
                index++;
            }
            return aColors;
        }
    }
})();
