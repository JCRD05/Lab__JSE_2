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
        if(this.courses.some(element => element.course === course)) return false;
        this.courses.push({course, level}); return true;
    }

    removeCourse(course) {
        const index = this.courses.findIndex(element => element.course === course);

        if(index !== -1) {
            this.courses.splice(index, 1); return true;
        }

        return false;
    }

    editCourse(course, level) {
        for(let element of this.courses) {
            if(element.course === course) {
                element.level = level; return true;
            }
        }

        return false;
    }

    sendMessage(from, message) {
        sendEmail(from.email, this.email, message);
        this.messages.push({ from: from.email, to: this.email, content: message});
    }

    showMessagesHistory() {
        console.log(`--- Message History for ${this.email} ---`);
        this.messages.forEach(message => {
            console.log(`From: ${message.from}, To: ${message.to},  Content: ${message.content}`)
        })
    }
}

let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');
teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);
console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses
teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
teacher1.showMessagesHistory();
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: test message
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: another message