import { MongoClient } from "mongodb";
import { expect } from "chai";
import { getUserByUsername } from "../src/db";

describe('getUserByUsername', () => {
    it('get the correct user from the database given a username', async () => {
        const client = await MongoClient.connect('mongodb://localhost:27017/TEST_DB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = client.db('TEST_DB');
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

        await db.collection('users').insertMany(fakeData);

        const actualResult = await getUserByUsername('abc');
        const finalDBState = await db.collection('users').find().toArray();
        await db.dropDatabase();
        client.close();

        const expectedResult = {
            id: 123,
            username: 'abc',
            email: 'abc@gmail.com'
        };

        expect(actualResult).excludingEvery('_id').to.deep.equal(expectedResult);
        expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData);

        
    });
});