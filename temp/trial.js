
'use strict';

let data = [{kood: "dok", props: {"type":"Aruanne"}}];

let found = data.filter((row) => row.kood ==="dok" && row.props.type === 'Aruanne');



console.log('found', found, !!found.length);



/*
const getNodes = (data, node) => {
    // node = выбранный элемент (ид)
    let selectedNodes = [];
    let nodeId = node;
    data.reduce((prevRow, currRow) => {
        console.log('node prevRow, currRow:', node, prevRow, currRow);
        if (prevRow.parentId == node) {
            console.log('prev soobib');
            selectedNodes.push(prevRow.id)
        }

        if (currRow.parentId == nodeId || currRow.parentId == node) {
            console.log('soobib');
            nodeId = currRow.id;
            selectedNodes.push(currRow.id)
            return currRow;
        } else {
            return prevRow;

        }

    });

    console.log('selectedNodes:', selectedNodes);
};

let data = [
    {id: 1, parentId: 0, name: 'Parent'},
    {id: 2, parentId: 1, name: 'Child 1'},
    {id: 3, parentId: 1, name: 'Child 2'},
    {id: 4, parentId: 0, name: 'Parent 2'},
    {id: 5, parentId: 4, name: 'chield 2-1'}
    ];

// нужно выбрать цепочку, который принадлежит элемент

getNodes(data, 0);

*/

//Rx.Observable.from([10, 12, 15, 21]).delay(3000).do(console.log);
/*
const arr = [10, 12, 15, 21];
arr.forEach((item, i) => setTimeout(function() {
    console.log('Index: ' + i + ', element: ' + item);
}, 3000));


(function foo() {
    'use strict';
    console.log(bar());
    function bar() { return 'bar'};
})()
 */

