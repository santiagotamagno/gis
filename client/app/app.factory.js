(function() {
    'use strict';

    angular
        .module('GisApp')
        .factory('authInterceptor', authInterceptor)
        .run(runApp);

    authInterceptor.$inject = ['$location', '$cookieStore', '$q'];

    /* @ngInject */
    function authInterceptor($location, $cookieStore, $q) {
        return {
            responseError: function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    $cookieStore.remove('token');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }

    runApp.$inject = ['$rootScope','$location', 'UsersService', '$window'];

    /* @ngInject */
    function runApp($rootScope, $location, UsersService, $window) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            UsersService.isLoggedInAsync(function(loggedIn) {
                if (toState.authenticate && !loggedIn) {
                    $location.path('/login');
                }
                if (toState.authenticate === false && loggedIn) {
                    $location.path('/');
                }
            });
        });
        $rootScope.$on('$viewContentLoaded', function() {
            $window.scrollTo(0, 0);
        });
    }
})();
