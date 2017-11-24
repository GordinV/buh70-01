'use strict';

exports.post = async (req, res) => {
    const user = require('../middleware/userData')(req), // данные пользователя
        parameter = req.body.parameter || '',// параметры если переданы
        lastDocId = req.body.lastDocId ? req.body.lastDocId : 0,
        sortBy = req.body.sortBy || '', //порядок сортировки
        sqlWhere = req.body.sqlWhere || ''; //динамический фильтр

    try {
        // создать объект
        const Doc = require('./../classes/DocumentTemplate');
        const doc = new Doc(parameter, null, user.userId, user.asutusId);
        let gridConfig = doc.config.grid.gridConfiguration;
        // вызвать метод
        let data = {
            result: await doc.selectDocs(),
            gridConfig: gridConfig
        };

        // вернуть данные

        res.send(data);
    } catch (error) {
        console.error('error:', error); // @todo Обработка ошибок
        res.send({result:'Error'});

    }
};