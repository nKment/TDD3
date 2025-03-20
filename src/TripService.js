"use strict";

import UserSession from "./UserSession.js";
import TripDAO from "./TripDAO.js";

class TripService {
    getTripsByUser(user) {
        const loggedUser = UserSession.getLoggedUser();
        if (!loggedUser) {
            throw new Error("User not logged in.");
        }

        const isFriend = user.getFriends().includes(loggedUser) || user === loggedUser;
        console.log("isFriend:", isFriend); //  Debug-Log

        if (isFriend) {
            console.log("TripDAO wird aufgerufen mit:", user); //  Debug-Log
            return TripDAO.findTripsByUser(user);
        } else {
            return [];
        }
    }
}

export default TripService;
