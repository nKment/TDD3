"use strict";

import UserSession from './UserSession.js';
import TripDAO from './TripDAO.js';

class TripService {
    getTripsByUser(user) {
        const loggedUser = UserSession.getLoggedUser();
        if (!loggedUser) {
            throw new Error('User not logged in.');
        }

        const isFriend = user.getFriends().includes(loggedUser);
        if (!isFriend) {
            return [];
        }

        return TripDAO.findTripsByUser(user)
            .filter(trip => trip.tag === 'public');
    }
}
export default TripService;
