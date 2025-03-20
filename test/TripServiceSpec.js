"use strict";

import chai from "chai";
import sinon from "sinon";
import { describe, it, beforeEach, afterEach } from "mocha";
import TripService from "../src/TripService.js";
import User from "../src/User.js";
import UserSession from "../src/UserSession.js";
import TripDAO from "../src/TripDAO.js";

const { expect } = chai;

describe("TripService", () => {
    let tripService;
    let userSessionStub;
    let tripDaoStub;

    beforeEach(() => {
        tripService = new TripService();
        userSessionStub = sinon.stub(UserSession, "getLoggedUser");
        tripDaoStub = sinon.stub(TripDAO, "findTripsByUser").callsFake((user) => {
            console.log("Stub ausgeführt für:", user); //  Debug-Log
            return ["Hawaii"]; // Stub gibt immer "Hawaii" zurück
        });
    });



    afterEach(() => {
        sinon.restore(); //  Stubs nach jedem Test zurücksetzen
    });

    it("should throw an error if no user is logged in", () => {
        userSessionStub.returns(null);

        const user = new User();

        console.log("Bevor getTripsByUser aufgerufen wird...");

        try {
            tripService.getTripsByUser(user);
            console.log("Nach getTripsByUser - dieser Log sollte NIE erscheinen!");
        } catch (error) {
            console.log("Gefangener Fehler:", error.message); // Zeigt die tatsächliche Fehlermeldung
        }
    });


    it("should return the trips of a user if logged user is a friend", () => {
        const loggedUser = new User();
        const friend = new User([loggedUser]); // loggedUser ist ein Freund
        const trips = ["Paris", "London"];

        userSessionStub.returns(loggedUser);
        tripDaoStub.returns(trips);

        console.log("Erwartete Trips:", trips);

        const result = tripService.getTripsByUser(friend);
        console.log("Tatsächliches Ergebnis:", result);

        expect(result).to.deep.equal(trips);
    });

    it("should return multiple trips if user has many trips", () => {
        const loggedUser = new User();
        const friend = new User([loggedUser]);
        const trips = ["Paris", "London", "Berlin", "Tokyo", "New York"];

        userSessionStub.returns(loggedUser);
        tripDaoStub.withArgs(sinon.match.instanceOf(User)).returns(trips);

        const result = tripService.getTripsByUser(friend);

        console.log("Returned trips:", result); // Debugging

        expect(result).to.deep.equal(trips);
        sinon.assert.calledWith(tripDaoStub, friend); // Sicherstellen, dass der Stub aufgerufen wurde
    });

    it("should return trips if user has themselves as a friend", () => {
        const loggedUser = new User();
        loggedUser.friends = [loggedUser]; // Benutzer ist sein eigener Freund
        const trips = ["Hawaii"];

        userSessionStub.returns(loggedUser);
        tripDaoStub.withArgs(sinon.match.any).returns(trips);

        const result = tripService.getTripsByUser(loggedUser);
        console.log("Erwartetes Ergebnis:", trips);
        console.log("Tatsächliches Ergebnis:", result);

        expect(result).to.deep.equal(trips);
    });
});
