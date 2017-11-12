const db = require('./../libs/db');
const getModule = require('./../libs/getModule');
const path = './../models/'; // путь к каталогу с моделями
const async = require('async');

class Document {
    constructor(docType, docId, userId) {
        this.docTypeId = docType;
        this.config = this.setConfig(docType);
        this.documentId = docId;
        this.userId = userId;
    }

    /**
     * подгрузит модель
     * @param docTypeId тип локумента
     * @returns {*}
     */
    setConfig(docTypeId) {
        let config;
        // check if exists model for this type
        try {
            config = getModule(docTypeId, null, path);
        } catch (e) {
            console.error(e);
            return null;
        }
        return config;
    }



    /**
     * Создает новый объект из модели для нового документа
     */
    createNew() {
    }

    /**
     * Создает объект с данными документа по его ИД
     */
   static async select () {
        if (!this.config) {
            return null;
        }

        const sqls = this.config.select;

        let data = await sqls.map(async query => {
                let data = {};
                console.log('quering', query.alias);
                try {
                    data[query.alias] = await db.queryDb(query.sql,[this.documentId, this.userId]);
                    return data;
                } catch(e) {
                    console.error(e);
                    return {};
                }
            });
        return data;
    }

    /**
     * Метод сохранения документа
     */
    save() {

    }

    /**
     * выполнит задачу
     */
    executeTask() {

    }

    /**
     * грузит справочники
     */
    loadLibs() {
    }

}

module.exports = Document;