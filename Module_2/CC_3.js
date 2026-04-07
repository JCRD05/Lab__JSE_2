function sendEmail(from, to, message) {}

class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = [];
        this.messages = [];
    }

    addCourse(course, level) {
        if (this.courses.some(element => element.course === course)) return false;
        this.courses.push({ course, level });
        return true;
    }

    removeCourse(course) {
        const index = this.courses.findIndex(element => element.course === course);
        if (index !== -1) {
            this.courses.splice(index, 1);
            return true;
        }
        return false;
    }

    editCourse(course, level) {
        for (let element of this.courses) {
            if (element.course === course) {
                element.level = level;
                return true;
            }
        }
        return this.addCourse(course, level);
    }

    sendMessage(from, message) {
        sendEmail(from.email, this.email, message);
        this.messages.push({ from: from.email, to: this.email, content: message });
    }

    showMessagesHistory() {
        this.messages.forEach(msg => {
            console.log(`From: ${msg.from}, To: ${msg.to}, Content: ${msg.content}`);
        });
    }
}

class ExtendedUser extends User {
    constructor({name, surname, email, role}) {
        super({name, surname, email, role});
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(value) {
        let parts = value.split(' ');
        this.name = parts[0];
        this.surname = parts[1];
    }

    static match(teacher, student, courseName = null) {
        let matches = [];

        for (let sCourse of student.courses) {
            let tCourse = teacher.courses.find(tc => tc.course === sCourse.course);
            
            if (tCourse && tCourse.level >= sCourse.level) {
                matches.push(sCourse);
            }
        }

        if (courseName) {
            return matches.find(m => m.course === courseName);
        }

        return matches;
    }
}

class Student extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'student'});
    }
}

class Teacher extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'teacher'});
    }
}

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(JSON.stringify(match)); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(JSON.stringify(match)); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}