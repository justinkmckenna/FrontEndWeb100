describe('types', () => {
    describe('declaring variables and stuff', () => {
        it('using let', () => {
            let x = 10;
            x = 20;
            let y;
            y = 3.14;
            y = 'tacos';
            y = ['dog','cat'];
            let z: any = 3;
            z = 'ahhhh';
            let q: string[];
            q = ['bird','plane'];
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
});