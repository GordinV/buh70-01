'use strict';

var relatedDocuments = {
    relatedDocuments: function () {
        // формируем зависимости
        let relatedDocuments = this.state.relations;
        if (relatedDocuments.length > 0 ) {
            relatedDocuments.forEach((doc)=> {
                if (doc.id ) {
                    // проверим на уникальность списка документов
                    let isExists = this.pages.find((page) => {
                        if (!page.docId) {
                            return false;
                        } else {
                            return page.docId == doc.id && page.docTypeId == doc.doc_type;
                        }
                    });

                    if (!isExists) {
                        // в массиве нет, добавим ссылку на документ
                        this.pages.push({docTypeId: doc.doc_type, docId:doc.id, pageName:doc.name + ' id:' + doc.id})
                    }
                }
            });
        }
    }
}

module.exports = relatedDocuments;