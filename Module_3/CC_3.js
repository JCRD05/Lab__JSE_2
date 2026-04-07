class User {
    #name;
    #surname;
    #email;

    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        const nameTicket = /^[A-Z][a-z]+$/;
        if (!nameTicket.test(value)) {
            throw new Error("Invalid name format: must start with Uppercase and contain only letters.");
        }
        this.#name = value;
    }

    get surname() {
        return this.#surname;
    }

    set surname(value) {
        const nameTicket = /^[A-Z][a-z]+$/;
        if (!nameTicket.test(value)) {
            throw new Error("Invalid surname format: must start with Uppercase and contain only letters.");
        }
        this.#surname = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        const emailTicket = /^[a-zA-Z.]+@[a-zA-Z.]+\.[a-zA-Z.]+$/;
        if (!emailTicket.test(value)) {
            throw new Error("Invalid email format: only letters and dots allowed.");
        }
        this.#email = value;
    }
}

class Users {
    constructor() {
        this.collection = new Map();
    }

    add(name, surname, email) {
        const newUser = new User(name, surname, email);
        this.collection.set(email, newUser);
    }

    delete(email) {
        return this.collection.delete(email);
    }

    get(email) {
        return this.collection.get(email);
    }

    getAll(field) {
        let usersArray = Array.from(this.collection.values());

        usersArray.sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });

        return usersArray;
    }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Xxxx", "Oooo", "dddd@gmail.com");

console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map(u => u.name));
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));