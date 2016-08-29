(function() {
    'use strict';

    angular
        .module('GisApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('root', {
                    abstract: true,
                    views: {
                        '@': {
                            template: '<ui-view/>'
                        },
                        'header@': {
                            template: '<ng-header></ng-header>'
                        }
                    }
                })
                .state('root.home',{
                    parent:'root',
                    url:'/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm'
                });
        });
})();
