import sinon from "sinon";
import request from "supertest";
import { expect } from "chai";
import db, { getUserByUsername } from "../src/db";
import { app } from "../src/server";
import { async } from "regenerator-runtime";

describe('GET /users/:username', () => {
    it('sends the correct response when a user with username is found', async () => {
        const fakeData = {
            id: 123,
            username: 'abc',
            email: 'abc@gmail.com'
        };

        const stub = sinon
            .stub(db, 'getUserByUsername')
            .resolves(fakeData);

        await request(app).get('/users/abc')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(fakeData);

        expect(stub.getCall(0).args[0]).to.equal('abc');

        stub.restore();
    });

    it('sends the correct response when there is an error', async () => {
        const fakeError = { message: "Error occured" };

        const stub = sinon.stub(db, 'getUserByUsername')
            .throws(fakeError);

        await request(app).get('/users/abc')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect(fakeError);

        stub.restore();
    });

    it('returns appropriate response when the user is not found', async () => {
        const fakeError = { message: "User not found" };

        const stub = sinon
            .stub(db, 'getUserByUsername')
            .resolves(null);

        await request(app).get('/users/xyz')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect(fakeError);

        stub.restore();
    });
});