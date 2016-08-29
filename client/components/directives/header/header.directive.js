(function() {
    'use strict';

    angular
        .module('GisApp.ngHeader').directive('ngHeader', function() {
            return {
                templateUrl: 'components/directives/header/header.html',
                restrict: 'EA',
                controller: HeaderCtrl,
                scope: {},
                controllerAs: 'vm'
            };
        });

    HeaderCtrl.$inject = ['UsersService', '$state'];

    /* @ngInject */
    function HeaderCtrl(UsersService, $state) {
        var vm = this;

        vm.isLoggedIn = UsersService.isLoggedIn;
        vm.getCurrentUser = UsersService.getCurrentUser;
        vm.logout = logout;

        /**
         * Logout service
         */
        function logout() {
            UsersService.logout()
            .then(function(response) {
                if (response.status === 'success') {
                    $state.go('root.home', {}, {
                        reload: true
                    });
                } else if (response.status === 'error') {
                    vm.errors = response.error;
                }
            })
            .catch(function(err) {
                vm.errors = err.error;
            });
        }
    }
})();
