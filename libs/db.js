const db = {
    queryDb: async(sqlString, params) => {
        let result = {
            error_code: 0,
            result: null,
            error_message: null,
            data: []
        }; // return data in this form

        const {Client} = require('pg@7.3'),
            config = require('../config/config'),
            client = new Client(config.pg.connection);

        await client.connect();
        try {
            const res = await client.query(sqlString, params);
            if (res.rowCount && res.rowCount === 1 && 'error_code' in res.rows[0]) {
                // executed procedure
                result = Object.assign(result, res.rows[0])
            } else {
                // usuall query
                result.data = res.rows;
                result.result = res.rowCount;
            }
        } catch (e) {
            result.error_code = 9;
            result.error_message = e.error ? e.error : 'Päringu viga';
        }
        await client.end();
        return result;
    },
    executeQueries: async(sqls, params) => {
        const {Client} = require('pg@7.3'),
            config = require('../config/config'),
            client = new Client(config.pg.connection);

        await client.connect();
        let result = [];
        await Promise.all(sqls.map(async sql => {
            let data = await client.query(sql, params);
            result.push(data);
        }));

        console.log('result', result);
        await client.end();
        return result;
    }
};

module.exports = db;