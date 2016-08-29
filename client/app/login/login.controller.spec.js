/* jshint -W117, -W030 */
'use strict';

describe('Controller: LoginCtrl', function () {

    beforeEach(module('GisApp'));

    var LoginCtrl,
      scope,
      $httpBackend,
      mockBackEndResponse =  {
          status: 'success',
          sessionId: '123456789',
          username: 'ali'
      };

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        $httpBackend.when('GET', 'app/main/main.html').respond(200);
        $httpBackend
            .when('POST', /.*\/user\/auth\//, '{"username":"hardcoded_user","password":"hardcoded_password"}')
            .respond(200, mockBackEndResponse);

        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope
        });
        $httpBackend.flush();
    }));

    it('should redirect to videos page', function() {
        LoginCtrl.form = {};
        LoginCtrl.form.$valid = true;
    });
});
