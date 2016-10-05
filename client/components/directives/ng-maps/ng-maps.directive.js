(function() {
    'use strict';

    angular
        .module('GisApp.ngMaps')
        .directive('ngMaps', NgMaps);

    // NgMaps.$inject = ['dependencies'];

    /* @ngInject */
    function NgMaps(NgMap) {

        var directive = {
            bindToController: true,
            controller: NgMapsCtrl,
            controllerAs: 'vm',
            restrict: 'AE',
            templateUrl: 'components/directives/ng-maps/ng-maps.html',
            scope: {
                options: '=',
            }
        };
        return directive;
    }

    NgMapsCtrl.$inject = ['NgMap', '$scope']

    /* @ngInject */
    function NgMapsCtrl(NgMap, $scope) {
        var vm = this;

        $scope.$watch('vm.options', function(newNames, oldNames) {
            if (newNames !== undefined) {
                if (_.has(newNames, 'heatMap')) {
                    if (newNames.heatMap !== undefined) {
                        NgMap.getMap().then(function(map) {
                            map.fusionTablesLayers[0].setOptions({
                                query: {
                                  select: 'location',
                                  from: newNames.heatMap
                              },
                            });
                        });
                    }
                }
            }
        });

        vm.styles = [{
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{
                    visibility: 'off'
                }]
        }];
    }
})();
