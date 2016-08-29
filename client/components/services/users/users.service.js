(function() {
    /*jshint validthis:true */
    'use strict';

    angular
        .module('GisApp.usersService')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$location', '$rootScope', '$http', '$cookieStore', '$q', 'appConstants', '$log'];

    /* @ngInject */
    function UsersService($location, $rootScope, $http, $cookieStore, $q, appConstants, $log) {
        var currentUser = {};

        if ($cookieStore.get('token')) {
            currentUser = setCurrentUser();
        }
        var service = {
            login: login,
            logout: logout,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isLoggedInAsync: isLoggedInAsync,
            getSessionId: getSessionId
        };
        return service;

        /**
        * Authenticate user and save token
        * @param  {Object}   user     - login info
        * @return {Promise}
        */
        function login(user) {
            return $http.post(
                `${appConstants.serverBackEnd}user/auth`,
                {
                    username: user.username,
                    password: user.password
                })
                .then(loginComplete)
                .catch(loginFailed);

            function loginComplete(response) {
                if (response.data.status === 'success') {
                    $cookieStore.put('token', {
                        sessionId: response.data.sessionId,
                        username: response.data.username
                    });
                    currentUser = response.data;
                }
                return response.data;
            }

            function loginFailed(error) {
                $log.error('XHR Failed for login. ' + error.data.message);
                return error.data;
            }
        }

        /**
         * Delete access token and user info
         * @return {Promise}
         */
        function logout() {
            return $http.get(
                `${appConstants.serverBackEnd}user/logout?sessionId=${this.getSessionId()}`
                )
                .then(logoutComplete)
                .catch(logoutFailed);

            function logoutComplete(response) {
                $cookieStore.remove('token');
                currentUser = {};
                return response.data;
            }

            function logoutFailed(error) {
                $log.error('XHR Failed for logout. ' + error.data.message);
                return error.data;
            }
        }

        /**
         * Gets all available info on authenticated user
         * @return {Object} user
         */
        function getCurrentUser() {
            return currentUser;
        }

        /**
         * Set Current User
         * @return {Object} currentUser
         */
        function setCurrentUser() {
            var currentUser = {};
            currentUser = {
                sessionId: $cookieStore.get('token').sessionId,
                username:  $cookieStore.get('token').username
            };
            return currentUser;
        }

        /**
         * Check if a user is logged in
         * @return {Boolean}
         */
        function isLoggedIn() {
            //should be more secure add in backend a getUserBySessionId method in order to call it to prevent
            //injection in cookie
            return (_.hasIn(currentUser, 'sessionId')) ? true : false;
        }

        /**
         * Waits for currentUser to resolve before checking if user is logged in
         */
        function isLoggedInAsync(cb) {
            if (currentUser.hasOwnProperty('$promise')) {
                currentUser.$promise.then(function() {
                    cb(true);
                }).catch(function() {
                    cb(false);
                });
            } else if (this.isLoggedIn()) {
                cb(true);
            } else {
                cb(false);
            }
        }

        /**
         * Get sessionId
         *  @return {String} sessionId
         */
        function getSessionId() {
            if (this.isLoggedIn()) {
                return $cookieStore.get('token').sessionId;
            }
        }
    }
})();
