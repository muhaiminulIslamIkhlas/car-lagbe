const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    // afterAll(async () => {
    //     await mongoDisconnect();
    // });

    describe('Test GET /launches', () => {
        test('should respond 200', async () => {
            const response = await request(app).get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        })
    });

    describe('Test Post launches', () => {
        const complateData = {
            mission: 'muhaimin',
            rocket: 'test',
            target: 'test',
            launchDate: 'January 4, 2008'
        };

        const dataWithoutDate = {
            mission: 'muhaimin',
            rocket: 'test',
            target: 'test',
        }

        test('should respond 201', async () => {
            const response = await request(app).post('/v1/launches')
                .send(complateData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(complateData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(dataWithoutDate);
        });
        test('It should catch missing required properties', async () => {
            const response = await request(app).post('/v1/launches')
                .send(dataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        });
        // test('It shoild catch invalid date', () => { });
    })
})

