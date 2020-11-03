describe('types', () => {
    describe('declaring variables and stuff', () => {
        it('using let', () => {
            let x = 10;
            x = 20;
            let y;
            y = 3.14;
            y = 'tacos';
            y = ['dog', 'cat'];
            let z: any = 3;
            z = 'ahhhh';
            let q: string[];
            q = ['bird', 'plane'];
        });

        it('more let', () => {
            let a: number | string; // union type
            a = 10;
            a = 'cat';
            // a = ['dog']; // can't do this
        });

        it('why var is bad', () => {

            const age = 21;
            if (age >= 21) {
                var message = 'old enough';
            } else {
                var message = 'too young';
            }
            expect(message).toBe('old enough'); // bad: shouldnt be able to access those locals outside of their scope
        });
    });

    describe('literals', () => {
        it('number literals', () => {
            let sample: number;
            sample = 10;
            sample = 10.5;
            sample = 0xff;
            sample = 0b1101;
            sample = 128_937_649_127_635_912_364_197.22;
            sample = +'555.55';
        });

        it('strings', () => {
            const messageOne = 'hello';
            const messageTwo = "hello";
            expect(messageOne).toBe(messageTwo);
        });

        it('format strings too', () => {
            const story = `
            multi-line: string.
            woo.
            `;
            console.log(story);
        });

        it('array literals', () => {
            const stuff = ['dogs', 'birds', 18]; // type union, not any
            expect(stuff.length).toBe(3);
            expect(stuff).toEqual(['dogs', 'birds', 18]);
            const missing = stuff[99];
            expect(missing).toBeUndefined();
        });

        it('tuple', () => {
            type NameInfo = [string, number];
            function formatName(first: string, last: string): NameInfo {
                const name = `${last}, ${first}`;
                return [name, name.length];
            }
            const info = formatName('han', 'solo');
            expect(info[0]).toBe('solo, han');
            expect(info[1]).toBe(9);
        });
    });

    describe('function literals', () => {
        it('has three ways but we use two', () => {
            expect(add(2, 3)).toBe(5); // can forward reference named functions
            // expect(sub(10,8)).toBe(2); // cant forward reference anonymous functions

            // named function
            function add(a: number, b: number): number {
                return a + b;
            }

            // anonymous function that a var points to
            const sub = (a: number, b: number): number => a - b;

            expect(add(2, 3)).toBe(5);
            expect(sub(10, 8)).toBe(2);
        });
        it('type aliases', () => {
            type MathOp = (x: number, y: number) => number;
            const add: MathOp = (a: number, b: number): number => a + b;
            function doMathAndDouble(op: MathOp, num: number): number {
                return op(num + num, num + num);
            }
            // higher ordered function - a function that takes one or more functions as args, and/or returns a function
            const result = doMathAndDouble(add, 10);
            const result2 = doMathAndDouble((x, y) => x % y, 5); // can pass in lambdas as long as they match MathOp type
            const weirdMath = (p: number, q: number) => p * 2 + q;
            const result4 = doMathAndDouble(weirdMath, 10);

            expect(result).toBe(40);
            expect(result2).toBe(0);
        });
    });
    describe('object literals', () => {
        it('structural typing with objects', () => {
            function logIt(thingy: { message: string }) { // {message: string} is an anonymous interface
                console.log(thingy.message);
            }

            logIt({ message: 'call mom' });

            const phoneCall = {
                from: 'bill',
                to: 'you',
                message: 'ahhhhhh'
            }

            logIt(phoneCall); // this is really cool, it just ignores the rest of the phoneCall properties
        });

        it('basic object lits', () => {
            const thor = {
                title: 'thor',
                director: 'me',
                year: 2122
            }
            thor.year = 2919;
            // thor.yearReleased = 2018; // this works in JS, just adds property to thor object, not great behavior
        });

        it('obj lits details', () => {
            interface Song {
                title: string,
                artist: string,
                lastPlayed?: string,
                [key: string]: any // wildcard for extra properties someone may want to add during initialzation
            }
            const rof: Song = {
                title: 'title',
                artist: 'artist',
                lastPlayed: 'morning',
                producedBy: 'joe'
            }
            const bg: Song = {
                title: 'new title',
                artist: 'new artist'
            }
        });
    });
});