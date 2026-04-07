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

try {
    let user1 = new User('Aaaa', 'Bbbb', 'Aaaa@gmail.com');
    console.log(user1);
    let user2 = new User('aaaa', 'Bbbb', 'Aaaa@gmail.com'); // -> Error
} catch(err) {
    console.log(err.message);
}