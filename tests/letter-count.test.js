import { expect } from "chai";
import { getLetterCount } from "../src/letter-count";


describe('getLetterCount - basic functionality', () => {
    it('returns empty object with empty string', () => {
        const expectedResult = {};
        const actualResult = getLetterCount('');
        expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns the correct letter count for a word with only one of each letter', () => {
        const expectedResult = { c: 1, a: 1, t: 1 };
        const actualResult = getLetterCount('cat');
        expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns the correct letter count for a word with more than one of each letter', () => {
        const expectedResult = { s: 4, i: 4, m: 1, p: 2 };
        const actualResult = getLetterCount('mississippi');
        expect(actualResult).to.deep.equal(expectedResult);
    });
});