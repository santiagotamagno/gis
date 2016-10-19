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

    NgMapsCtrl.$inject = ['NgMap', '$scope'];

    /* @ngInject */
    function NgMapsCtrl(NgMap, $scope) {
        var vm = this;
        vm.toggleTraffic = toggleTraffic;
        vm.styles = [{
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{
                    visibility: 'off'
                }]
        }];

        activate();

        function activate() {
            addTraffic();
        }

        function toggleTraffic() {
            if (vm.trafficLayer.getMap() === null) {
                addTraffic();
            } else {
                vm.trafficLayer.setMap(null);
                vm.isCheckedTraffic = false;
            }
        }

        function addTraffic() {
            NgMap.getMap().then(function(map) {
                vm.trafficLayer = new google.maps.TrafficLayer();
                vm.trafficLayer.setMap(map);
                vm.isCheckedTraffic = true;
            });
        }

        $scope.$watch('vm.options', function(newNames, oldNames) {
            if (newNames !== undefined) {

                //Fusion tables && heatMap
                if (_.has(newNames, 'heatMap') && newNames.heatMap !== undefined) {

                    //check equals heapmap
                    if (oldNames === undefined) {
                        var oldNames = {};
                        oldNames.heatMap = undefined;
                    }
                    if (newNames.heatMap !== oldNames.heatMap) {
                        NgMap.getMap().then(function(map) {
                            gapi.client.load('fusiontables', 'v1', function() {
                                var query = 'select col1 from ' + newNames.heatMap;
                                var request = gapi.client.fusiontables.query.sqlGet({sql: query});
                                request.execute(function(response) {
                                    onDataFetched(response, map);
                                });
                            });
                        });
                    }
                }

                //poi
                if (_.has(newNames, 'kml') && newNames.kml !== undefined) {
                    cleanMapHeatMap();
                }

            }
        });

        function cleanMapHeatMap() {
            if (vm.heatmap !== undefined) {
                vm.heatmap.setMap(null);
            }
        }

        function onDataFetched(response, map) {
            if (response.error) {
                console.log('response.error');
            } else {
                drawHeatmap(extractLocations(response.rows), map);
            }
        }

        function extractLocations(rows) {
            // Patterns for latitude/longitude in a single field, separated by a space
            // or comma, with optional north/south/east/west orientation
            var numberPattern = '([+-]?\\d+(?:\\.\\d*)?)';
            var latPattern = numberPattern + '\\s*([NS])?';
            var lngPattern = numberPattern + '\\s*([EW])?';
            var latLngPattern = latPattern + '(?:\\s+|\\s*,\\s*)' + lngPattern;
            var northRegexp = /N/i;
            var eastRegexp = /E/i;
            var parseRegexp = new RegExp(latLngPattern, 'i');
            var locations = [];
            for (var i = 0; i < rows.length; ++i) {
                var row = rows[i];
                if (row[0]) {
                    var parts = row[0].match(parseRegexp);
                    if (parts) {
                        var latString = parts[1];
                        var latOrientation = parts[2];
                        var lngString = parts[3];
                        var lngOrientation = parts[4];
                        var lat = parseFloat(latString);
                        var lng = parseFloat(lngString);
                        if (latOrientation) {
                            var latAdjust = northRegexp.test(latOrientation) ? 1 : -1;
                            lat = latAdjust * Math.abs(lat);
                        }
                        if (lngOrientation) {
                            var lngAdjust = eastRegexp.test(lngOrientation) ? 1 : -1;
                            lng = lngAdjust * Math.abs(lng);
                        }
                        var latLng = new google.maps.LatLng(lat, lng);
                        locations.push(latLng);
                    }
                }
            }
            return locations;
        }

        function drawHeatmap(locations, map) {
            vm.heatmap = new google.maps.visualization.HeatmapLayer({
                dissipating: true,
                gradient: [
                  'rgba(102,255,0,0)',
                  'rgba(147,255,0,1)',
                  'rgba(193,255,0,1)',
                  'rgba(238,255,0,1)',
                  'rgba(244,227,0,1)',
                  'rgba(244,227,0,1)',
                  'rgba(249,198,0,1)',
                  'rgba(255,170,0,1)',
                  'rgba(255,113,0,1)',
                  'rgba(255,57,0,1)',
                  'rgba(255,0,0,1)'
                ],
                opacity: 0.79,
                radius: 33,
                data: locations
            });
            cleanMapHeatMap();
            vm.heatmap.setMap(map);
        }
    }
})();
