import { expect } from "chai";
import { getUserByUsername } from "../src/db";
import {
    setDatabaseData,
    getDatabaseData,
    resetDatabase
} from "./test-helpers";


describe('getUserByUsername', () => {
    it('get the correct user from the database given a username', async () => {
        const fakeData = [
            {
                id: 123,
                username: 'abc',
                email: 'abc@gmail.com'
            },
            {
                id: 124,
                username: 'wrong',
                email: 'wrong@wrong.com'
            }
        ];

        await setDatabaseData('users', fakeData);

        const actualResult = await getUserByUsername('abc');
        const finalDBState = await getDatabaseData('users');
        await resetDatabase();

        const expectedResult = {
            id: 123,
            username: 'abc',
            email: 'abc@gmail.com'
        };

        expect(actualResult).excludingEvery('_id').to.deep.equal(expectedResult);
        expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData);


    });
});