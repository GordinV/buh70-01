'use strict';

const React = require('react'),
    flux = require('fluxify'),
    styles = require('./page-label-styles');

class PageLabel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled
        }

        this.handleClick = this.handleClick.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({disabled: nextProps.disabled});
    }


    handleClick() {
        // обработчик на событие клик, подгружаем связанный документ

        if (this.state.disabled) {
            return;
        }

        let page = this.props.page;

        if (this.props.handlePageClick) {
            this.props.handlePageClick(page);
        }
    }


    render() {
        let page = this.props.page,
            style = Object.assign({},styles.pageLabel, this.props.active  ? {backgroundColor:'white'}: {})

        return <label style={style}
                      disabled={this.state.disabled}
                      ref="pageLabel"
                      onClick={this.handleClick}>
            {page.pageName}
        </label>
    }
}


PageLabel.PropTypes = {
    handlePageClick: React.PropTypes.func,
    page: React.PropTypes.object.isRequired,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool
};


PageLabel.defaultProps = {
    disabled: false,
    active: true
}


module.exports = PageLabel;