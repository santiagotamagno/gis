(function() {

    'use strict';

    angular
        .module('GisApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['UsersService', '$state'];

    /* @ngInject */
    function LoginCtrl(UsersService, $state) {
        var vm = this;

        vm.user = {};
        vm.errors = {};
        vm.login = login;

        /**
         * Login service in order to access to see videos list and detail
         */
        function login() {
            vm.submitted = true;
            if (vm.form.$valid) {
                UsersService.login({
                    username: vm.user.username,
                    password: vm.user.password
                })
                .then(function(response) {
                    if (response.status === 'success') {
                        $state.go('root.home.videos', {}, {
                            reload: true
                        });
                    } else if (response.status === 'error') {
                        vm.errors.other = response.error;
                    }
                })
                .catch(function(err) {
                    vm.errors.other = err.error;
                });
            }
        }
    }
})();
