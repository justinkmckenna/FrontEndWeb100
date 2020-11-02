describe('writing specs in typescript', () => {
    it('is easy', () => {
        expect(true).toBe(true);
    });

    it('can add two ints', () => {
        const a = 10;
        const b = 20;
        const answer = a + b;
        expect(answer).toBe(30);
    });
});

describe('more tests', () => {
    it('here is another one', () => {
        expect(1).toBe(1);
    });
});

describe('using jasmine', () => {
        it('easy', () => {
            const favColors = ['red','blue'];
            expect(favColors).toEqual(['red','blue']);
        });
});