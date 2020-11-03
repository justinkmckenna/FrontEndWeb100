describe('functions', () => {

    describe('params and overloading', () => {

        it('cant overload', () => {
            function formatName(f: string, l: string, mi?: string): string {
                const middle = mi ? ` ${mi}.` : '';
                return `${l}, ${f}${middle}`;
            }
            expect(formatName('han', 'solo', '')).toBe('solo, han'):
            expect(formatName('han', 'solo')).toBe('solo, han');
            expect(formatName('han', 'solo', 'd')).toBe('solo, han d.');
        });

        it('falsy and truthy', () => {
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(0).toBeFalsy();
            expect(1).toBeTruthy();
            expect(-1).toBeTruthy();
            expect('').toBeFalsy();
            expect(' ').toBeTruthy();

            const nums = [1, 2, 3];
            expect(nums).toBeTruthy();
            expect(nums[0]).toBeTruthy();
            expect(nums[99]).toBeFalsy();
        });

        it('null coalescing stuff', () => {
            const answer = null || false || 0 || undefined || '' || 'tacos';
            expect(answer).toBe('tacos');

            interface Person {
                name: string,
                age: number,
                job?: {
                    title: string,
                    salary: number
                }
            }

            const bob: Person = {
                name: 'Robert',
                age: 53,
                // job: {
                //     title: 'CEO',
                //     salary: 32_000
                // }
            }

            const name = bob.name;
            const pay = bob.job?.salary;

            expect(pay).toBeUndefined();
        });

        it('default values', () => {
            function add(a: number = 2, b: number = 10, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((l, r) => r + l, firstTwo);
            }
            expect(add(2)).toBe(12);
            expect(add(undefined, 2)).toBe(4);
            expect(add(1, 2, 3, 4, 5)).toBe(15);
        });

        it('spread operator', () => {
            const starter = [1, 2, 3];
            const newArr = [0, ...starter, 4, 5];
            expect(newArr).toEqual([0, 1, 2, 3, 4, 5]);
            expect(starter).toEqual([1, 2, 3]);
        });

        it('spread objects', () => {
            const movie = {
                title: 'movie title',
                director: 'movie director',
                year: 2017
            }

            const movieWithActorList = { ...movie, actorList: ['joe', 'justin'] };

            expect(movie).toEqual({
                title: 'movie title',
                director: 'movie director',
                year: 2017
            });
            expect(movieWithActorList).toEqual({
                title: 'movie title',
                director: 'movie director',
                year: 2017,
                actorList: ['joe', 'justin']
            });
        });

        it('destructuring args', () => {
            let seatType: 'WINDOW' | 'AISLE' | 'MIDDLE';
            seatType = 'MIDDLE';

            interface HttpStuff { method: 'GET' | 'POST' | 'PUT' | 'DELETE', format: string }
            function apiCall(url: string, { method, format }: HttpStuff): void {
                console.log(`making a request to ${url} using ${method} and format ${format}`)
            }

            // can also do it this way
            function apiCall2(url: string, http: HttpStuff): void {
                console.log(`making a request to ${url} using ${http.method} and format ${http.format}`)
            }

            apiCall('/books', { method: 'GET', format: 'application/json' });
        });

        describe('higher-order functions', () => {
            // a function that takes one or more functions as arguments, or returns a function is a HOF
            it('making a tagmaker function', () => {
                function tagMaker(element: string, content: string): string {
                    return `<${element}>${content}</${element}>`;
                }

                expect(tagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
            });

            it('an oop example', () => {
                class TagMaker {
                    constructor(private element: string) { }
                    make(content: string): string {
                        return `<${this.element}>${content}</${this.element}>`;
                    }
                }
                const h1Maker = new TagMaker('h1');

                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
            });

            it('functional approach', () => {
                function tagMaker(element: string): (content: string) => string {
                    return (c) => `<${element}>${c}</${element}>`
                }

                const h1Maker = tagMaker('h1');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
            });
        });

        describe('common array', () => {
            const numbers = [1, 2, 3, 4, 5];

            it('has a way to look at just each member of the array', () => {
                numbers.forEach((e, i, c) => console.log({ e, i, c }));
            });

            it('array methods that creates brand new array', () => {
                const evens = numbers.filter(x => x % 2 === 0);
                expect(evens).toEqual([2, 4]);
                expect(numbers)
            });

            it('mutating each element to create a new element', () => {
                const doubled = numbers.map(n => n * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10]);
            });
        });

        describe('methods that return a single scalar value', () => {
            const numbers = [1, 2, 3, 4, 5];

            it('checking the membership of an array', () => {
                const allEven = numbers.every(x => x % 2 === 0);
                expect(allEven).toBe(false);
                const someEven = numbers.some(x => x % 2 === 0);
                expect(someEven).toBe(true);
            });

            it('reduce - boil it down to a single value', () => {
                const sum = numbers.reduce((s,n)=>s+n); // s is running sum, n is current element
                expect(sum).toBe(15);
            });
        });
    });

    describe('practice', () => {
        fit('try it', () => {
            interface Vehicle {
                vin: string;
                make: string;
                model: string;
                mileage: number;
            }
            const vehicles :Vehicle[] = [
                { vin: '8888', make: 'Chevy', model: 'Bolt', mileage: 18_540},
                { vin: '8938j3783', make: 'Honda', model: 'Pilot', mileage: 52_123},
                { vin: '38938', make: 'Dodge', model: 'RAM', mileage: 82_233}
            ];

            const highMileageVehicles = vehicles.filter(x => x.mileage > 50_000).map(x => `${x.make} ${x.model}`);

            // your code here.
            // a high-mielage vehicle is a vehcile with over 50_000 miles on it.
            expect(highMileageVehicles).toEqual(['Honda Pilot', 'Dodge RAM']);
        });
    });

    it('testing this.isEven', () => {
        class MyClass {
            numbers = [1, 2, 3, 4, 5];
            isEven = (x:number) => x % 2 === 0;
            getNewNumbers = () => this.numbers.filter(this.isEven);
        }
        const myClass = new MyClass();
        console.log(myClass.getNewNumbers());
    });
});