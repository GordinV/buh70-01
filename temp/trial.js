'use strict';

async function test(){
    let arr = [1,2,3];
    let resultArray = [];
    await Promise.all(arr.map(async (num) => {
        let result = await getData(num);
        resultArray.push(result);
        console.log(result);
    }));
    console.log('after foreach', resultArray);
}

function getData(x){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, 500);
    });
}

test();

/*

(async() => {
    console.log('start');
    const db = require('../libs/db');
    console.log('db', db);
    let data =  await db.queryDb('SELECT $1::text as message',['Hello world!']);
    console.log('received:', data);
})();

*/

/*
const pg_test = async() => {
    const {Client} = require('pg@7.3'),
        config = require('../config/config'),
        client = new Client(config.pg.connection);

    await client.connect();
    try {
        const res = await client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(res); // Hello world!

    } catch(e) {
        console.error(e);
    }
    await client.end();
}

pg_test();
*/

