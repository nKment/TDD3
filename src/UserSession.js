"use strict";

class UserSession {
    static getLoggedUser() {
        throw new Error("UserSession.getLoggedUser() should not be called in a unit test");
    }
}

export default UserSession;
