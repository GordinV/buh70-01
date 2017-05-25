
'use strict';

const isExists = (object, prop) => {
    let result = false;
    console.log('object, prop', object, prop);
    if (prop in object) {
        result = true;
    }
    return result;
}

let isShow = true,
    disp = is
