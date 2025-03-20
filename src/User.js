"use strict";

export default class User {
    constructor(friends = []) {
        this._friends = friends; // Private Variable mit Konvention (_friends)
    }

    getFriends() {
        return [...this._friends]; // Rückgabe einer Kopie, um unbeabsichtigte Änderungen zu vermeiden
    }

    addFriend(friend) {
        if (!this._friends.includes(friend)) {
            this._friends.push(friend);
        }
    }

    removeFriend(friend) {
        this._friends = this._friends.filter(f => f !== friend);
    }
}
