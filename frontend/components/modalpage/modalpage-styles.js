module.exports = {
    container: {
        position: 'fixed',
        top: '0',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },
    modalPage: {
        position: 'absolute',
        border: '1px solid black',
        width: '50%',
        height: 'auto',
        left: '10%',
        top: '0',
        background: 'white',
        margin: '8px',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column'
    },
    modalPageContent: {
        padding: '10px',
        margin: '10px'
    },
    header: {
        height: '30px',
        width: '100%',
        border: '1px solid darkgray',
        background: 'blue',
        display: 'flex',
        justifyContent: 'space-between'
    },

    headerName: {
        color: 'white',
        alignSelf: 'center',
        marginLeft:'10px'
    },

    modalFooter: {
        alignSelf: 'center',
        display: 'flex'
    },

    modalPageButtons: {
        height: '30px',
        width:'100px'
    },

    buttonsSeparator : {
        width:'10px'
    },

    buttonClose: {
        borderRadius: '50%'
    }

}