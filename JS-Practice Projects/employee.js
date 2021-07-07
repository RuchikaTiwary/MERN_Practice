class Employee {
    constructor(firstName, lastName, title, salary) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._title = title;
        this._salary = salary;
        this._active = true;
    }

    fire() {
        this._active = false;
    }

    info() {
        if (this._active) {
            const info = `${this._firstName} ${this._lastName}, ${this._title} is active`;
            return info;
        } else {
            const info = "Employee is not active !!";
            return info;
        }
    }
}