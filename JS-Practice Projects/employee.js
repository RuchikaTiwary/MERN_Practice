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

class ContractEmp extends Employee {
    constructor(firstName, lastName, title, salary, hrsPerWeek) {
        super(firstName, lastName, title, salary);

        this._hrsPerWeek = hrsPerWeek;
    }
    info() {
        if (this._active) {
            const info = `${this._firstName} ${this._lastName}, ${this._title} is active
            with ${this._hrsPerWeek} uti`;
            return info;
        } else {
            const info = "Employee is not active !!";
            return info;
        }
    }

    set hours(newHrs) {
        if (newHrs < 40) {
            this._hrsPerWeek = newHrs;
        } else {
            alert("Hourse out of range of part-time work!!");
        }
    }
}