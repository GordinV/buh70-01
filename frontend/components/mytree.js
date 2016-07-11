var React = require('react'),
    MyList = require('./mylist.js');

var MyTree = React.createClass({
    displayName: 'MyTree',


    render: function render() {
        console.log('my tree render');
        return React.createElement(
            'div',
            { id: 'tree' },
            React.createElement(MyList,{
                sourceArray: this.props.data, 
                value: this.props.value,
                onChangeAction: 
                this.props.onChangeAction})
        );
    }
});

module.exports = MyTree;
