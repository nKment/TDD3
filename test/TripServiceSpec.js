import chai from 'chai';
import sinon from 'sinon';
import TripService from '../src/TripService.js';
import User from '../src/User.js';
import UserSession from '../src/UserSession.js';

const { expect } = chai;

describe('TripService', () => {
    let tripService;

    beforeEach(() => {
        tripService = new TripService();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should throw an error if no user is logged in', () => {
        sinon.stub(UserSession, 'getLoggedUser').returns(null);

        const someUser = new User();

        expect(() => tripService.getTripsByUser(someUser)).to.throw('User not logged in.');
    });
});
