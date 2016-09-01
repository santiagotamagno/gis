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
                    if (response.data.status === 'success') {
                        $state.go('root.home', {}, {
                            reload: true
                        });
                    } else if (response.data.status === 'error') {
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
