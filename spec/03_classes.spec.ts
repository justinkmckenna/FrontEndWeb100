class Person {
    constructor(
        public firstName: string,
        public lastName: string
    ) { }

    get fullName(): string {
        return `${this.lastName}, ${this.firstName}`;
    }
}

class Employee extends Person {

    private _salary: number;

    constructor(
        firstName: string,
        lastName: string,
        public job: string,
        salary: number
    ) {
        super(firstName, lastName);
        this._salary = salary;
    }

    get salary(): number {
        return this._salary;
    }

    giveRaise(amount: number): void {
        this._salary += amount;
    }
}

class Retiree extends Person {
    constructor(
        firstName: string,
        lastName: string,
        public pension: number
    ) {
        super(firstName, lastName);
    }
}

describe('creating and using classes', () => {

    it('create employee', () => {
        const carla = new Employee('Carla', 'Jones', 'CEO', 182_000);
        expect(carla.firstName).toBe('Carla');
        expect(carla.lastName).toBe('Jones');
        expect(carla.fullName).toBe('Jones, Carla');
        expect(carla.salary).toBe(182_000);
        carla.giveRaise(1000);
        expect(carla.salary).toBe(183_000);
    });

    it('create retiree', () => {
        const paul = new Retiree('Paul', 'Jones', 83_000);

    });
});