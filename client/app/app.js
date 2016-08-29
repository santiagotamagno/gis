(function() {
    'use strict';

    angular
        .module('GisApp', [
            'ngCookies',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'GisApp.usersService',
            'GisApp.ngHeader',
            'GisApp.appConstants',
            'GisApp.ngMaps'
        ]);
})();
