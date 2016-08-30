(function() {
    'use strict';

    angular
        .module('GisApp.ngMaps')
        .directive('ngMaps', NgMaps);

    // NgMaps.$inject = ['dependencies'];

    /* @ngInject */
    function NgMaps() {

        var directive = {
            bindToController: true,
            controller: NgMapsCtrl,
            controllerAs: 'vm',
            restrict: 'AE',
            templateUrl: 'components/directives/ng-maps/ng-maps.html',
            scope: {
                kml: '='
            }
        };
        return directive;
    }

    /* @ngInject */
    function NgMapsCtrl() {
        var vm = this;

        //testing @todo delete
        vm.kml = vm.kml || 'http://googlemaps.github.io/kml-samples/kml/Placemark/placemark.kml';
    }
})();
