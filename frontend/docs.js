'use strict';

const Register = require('../frontend/docs/doc-register/doc-register.jsx');

// данные для хранилища
//localStorage['docsStore'] = storeData;
storeData = JSON.parse(storeData);

ReactDOM.render(React.createElement(
    Register,
    { id: 'grid', components: storeData}, 'Тут будут компоненты'
), document.getElementById('grid'));