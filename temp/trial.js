
'use strict';


let createLibs = () => {
    let libs = {};
    LIBRARIES.forEach((lib) => {
        libs[lib] = [];
    })
    return libs;
}

const LIBDOK = 'SORDER',
    LIBRARIES = ['asutused', 'kontod', 'dokProps',  'tunnus', 'project', 'nomenclature'],
    libs = createLibs();


console.log(libs);

