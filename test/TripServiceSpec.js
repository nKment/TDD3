import chai from 'chai';
import sinon from 'sinon';
import TripService from '../src/TripService.js';
import User from '../src/User.js';
import UserSession from '../src/UserSession.js';
import TripDAO from '../src/TripDAO.js';

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

    it('should return empty trip list if logged user is not a friend', () => {
        const loggedUser = new User();
        const requestedUser = new User(); // keine Freunde → loggedUser ist KEIN Freund

        sinon.stub(UserSession, 'getLoggedUser').returns(loggedUser);
        const tripDAOSpy = sinon.stub(TripDAO, 'findTripsByUser');

        const result = tripService.getTripsByUser(requestedUser);

        expect(result).to.be.an('array').that.is.empty;
        expect(tripDAOSpy.notCalled).to.be.true; // DAO darf NICHT aufgerufen werden!
    });
});
