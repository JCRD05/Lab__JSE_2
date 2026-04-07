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

class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({ name, surname, email }));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({ name, surname, email }));
    }

    getStudentByName(name, surname) {
        return this.students.find(s => s.name === name && s.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(t => t.name === name && t.surname === surname);
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => ExtendedUser.match(teacher, student).length > 0);
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student => ExtendedUser.match(teacher, student).length > 0);
    }
}

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...