/* jshint -W117, -W030 */
'use strict';

describe('Service: UsersService', function () {

    beforeEach(module('GisApp'));

    var UserSvc,
        cookies;

    beforeEach(inject(function (_UsersService_, _$cookieStore_) {
        UserSvc = _UsersService_;
        cookies = _$cookieStore_;
    }));

    it('Testing get Session Id from cookie from login user', function() {
        cookies.put('token', {
            sessionId: '123456789',
            username: 'ali'
        });

        spyOn(UserSvc, 'isLoggedIn').andCallFake(function() {
            return true;
        });
        expect(UserSvc.getSessionId()).toEqual('123456789');
    });

    it('Testing get Session Id from cookie from not login user', function() {
        cookies.put('token', {
            sessionId: '123456789',
            username: 'ali'
        });

        spyOn(UserSvc, 'isLoggedIn').andCallFake(function() {
            return false;
        });
        expect(UserSvc.getSessionId()).toNotEqual('123456789');
    });
});
