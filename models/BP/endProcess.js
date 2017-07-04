
'use strict';
const setBpmStatuses = require('./setBpmStatus');

const endProcess = (docId, userId, doc)=> {
    // реализует завершение БП документа

    const   ACTUAL_TASK_STEP = 2, // устанавливаем активный статус для документа
        DOC_STATUS = 2, // закрыт
        SQL = 'update docs.doc set bpm = $2, history = $3, status = $4 where id = $1',
        DocDataObject = require('../documents');

    let bpm = setBpmStatuses(ACTUAL_TASK_STEP, userId, doc), // выставим актуальный статус для следующего процесса
        history = {user: userId, updated: Date.now()},
        params = [docId, JSON.stringify(bpm), JSON.stringify(history), DOC_STATUS];

    return DocDataObject.executeSqlQueryPromise(SQL, params);
};

module.exports = endProcess;
