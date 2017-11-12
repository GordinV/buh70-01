'use strict';

const db = require('./db');
const result = {
    error_code: 0,
    result: null,
    error_message: null,
    data: []
}

describe('db query tests', () => {

    it('should return data', async() => {
        expect.assertions(4);
        let sqlString = 'SELECT $1::text as message',
            params = ['Hello world!'];

        let data =  await db.queryDb(sqlString,params);
        console.log('data', data);
        expect(data).toBeDefined();
        expect(data).toHaveProperty('error_code', 0);
        expect(data).toHaveProperty('result');
        expect(data).toHaveProperty('data');
    });

    it('test of wrong query', async() => {
        expect.assertions(3);
        let sqlString = 'SELECT a ',
            params = [];

        let data =  await db.queryDb(sqlString,params);
        console.log('data', data);
        expect(data).toBeDefined();
        expect(data).toHaveProperty('error_code', 9);
        expect(data).toHaveProperty('error_message');
    });

    it ('test of multiple query', async() => {
        expect.assertions(1);
        let sqlString = [`SELECT 'a' `, `SELECT 'b' `],
            params = [];

        let data =  await db.executeQueries(sqlString,params);
        console.log('data[]:', data);
        expect(data).toBeDefined();

    })

});