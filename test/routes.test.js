'use strict';
const request = require('request');
const URL = 'http://localhost:3000';

describe('test for server', () => {
    it('get request', async() => {
            expect.assertions(1);
            let response = await asyncRequestGet(URL);
            expect(response.statusCode).toBe(200);
        }
    );

    it('test of get routes, login', async() => {
        expect.assertions(1);
        let response = await asyncRequestGet(URL + '/login');
        expect(response.statusCode).toBe(200);
    });

    it('test of get routes, logout', async() => {
        expect.assertions(1);
        let response = await asyncRequestGet(URL + '/logout');

        expect(response.statusCode).toBe(200);
    });

    it('test of post routes, login with wrong password', async() => {
        let response = await asyncRequestPost(URL + '/login', {username: 'vlad', password: 'xxx123'});
        expect(response.statusCode).toBeDefined();
        expect(response.statusCode).toBe(200); //redirect
        expect(response.headers).not.toHaveProperty('location'); //no redirect
    });

    it('test of post routes, login with right password', async() => {
        let response = await asyncRequestPost(URL + '/login', {username: 'vlad', password: '123'});
        expect(response.statusCode).toBeDefined();
        expect(response.statusCode).toBe(302); //redirect
        expect(response.headers).toHaveProperty('location'); //redirect
        expect(response.headers.location).toBe('/documents'); //redirect
    });

    it('test of get routes, documents', async() => {
        expect.assertions(1);
        let response = await asyncRequestGet(URL + '/documents');
        expect(response.statusCode).toBe(200);
    });

    it('test of get routes, document', async() => {
        expect.assertions(1);
        let response = await asyncRequestGet(URL + '/document/ARV0');
        expect(response.statusCode).toBe(200);
    });

    it('test of get wrong route, wrong', async() => {
        expect.assertions(1);
        let response = await asyncRequestGet(URL + '/wrong');
        expect(response.statusCode).toBe(404);
    });
});

const asyncRequestGet = (url) => {
    return new Promise((resolve, reject) => {
        request.get({url: url}, (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    });
}

const asyncRequestPost = (url, params) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: url,
            form: params

        }, (error, response, body) => {
            if (error) return reject(error);
            resolve(response);
        });
    });
}