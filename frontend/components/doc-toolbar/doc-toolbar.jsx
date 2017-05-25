'use strict';

const React = require('react'),
    flux = require('fluxify'),
    ToolbarContainer = require('./../toolbar-container/toolbar-container.jsx'),
    BtnAdd = require('./../button-register/button-register-add/button-register-add.jsx'),
    BtnEdit = require('./../button-register/button-register-edit/button-register-edit.jsx'),
    BtnSave = require('./../button-register/button-register-save/button-register-save.jsx'),
    BtnPrint = require('./../button-register/button-register-print/button-register-print.jsx'),
    TaskWidget = require('./../task-widget/task-widget.jsx');

class DocToolBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.btnEditClick = this.btnEditClick.bind(this);
        this.btnAddClick = this.btnAddClick.bind(this);
        this.btnSaveClick = this.btnSaveClick.bind(this);
        this.btnPrintClick = this.btnPrintClick.bind(this);

    }

    render() {
        let isEditMode = this.props.edited,
            isDocDisabled = this.props.docStatus == 2 ? true: false,
            toolbarParams = {
                btnAdd: {
                    show: !isEditMode,
                    disabled: isEditMode
                },
                btnEdit: {
                    show: !isEditMode,
                    disabled: isDocDisabled
                },
                btnPrint: {
                    show: true,
                    disabled: true
                },
                btnSave: {
                    show: isEditMode,
                    disabled: false
                }
            };

        return <ToolbarContainer ref='toolbarContainer'>
            <div>
                <BtnAdd ref='btnAdd' onClick={this.btnAddClick} show={toolbarParams['btnAdd'].show}
                        disabled={toolbarParams['btnAdd'].disabled}/>
                <BtnEdit ref='btnEdit' onClick={this.btnEditClick} show={toolbarParams['btnEdit'].show}
                         disabled={toolbarParams['btnEdit'].disabled}/>
                <BtnSave ref='btnSave' onClick={this.btnSaveClick} show={toolbarParams['btnSave'].show}
                         disabled={toolbarParams['btnSave'].disabled}/>
                <BtnPrint ref='btnPrint' onClick={this.btnPrintClick} show={toolbarParams['btnPrint'].show}
                          disabled={toolbarParams['btnPrint'].disabled}/>
                {this.props.bpm ? <TaskWidget ref='taskWidget' taskList={this.props.bpm}
                                              handleSelectTask={this.handleSelectTask}
                                              handleButtonTask={this.handleButtonTask}
                    /> : null}

            </div>
        </ToolbarContainer>
    }

    btnAddClick() {
        // обработчик для кнопки Add
        // отправим извещение наверх
//        this.props.onClick(this.name);
        flux.doAction('docIdChange', 0);
        flux.doAction('editedChange', true);
        flux.doAction('savedChange', false);
    }

    btnEditClick() {
        // обработчик для кнопки Edit
        // переводим документ в режим редактирования, сохранен = false
        if (!this.props.docStatus || this.props.docStatus < 2 ) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }
    }

    btnPrintClick() {
        console.log('print called');
    }

    btnSaveClick() {
        // обработчик для кнопки Save
        // валидатор

//        let isValid = !this.validator(); @todo validator
        let isValid = true;

        if (isValid) {
            // если прошли валидацию, то сохранеям
            flux.doAction('saveData');
            flux.doAction('editedChange', false);
            flux.doAction('savedChange', true);

        }
    }

    handleButtonTask() {
        // метод вызывается при выборе задачи
        // найдем актуальную задачу

        let actualTask = this.state.taskList.filter((task) => {
                if (task.actualStep) {
                    return task;
                }
            }),
            task = actualTask.map((task) => {
                return task.action
            }); // оставим только название процедуры

        flux.doAction('executeTask', task);
    }


    handleSelectTask(e) {
        // метод вызывается при выборе задачи
        //todo Закончить
        const taskValue = e.target.value;
    }

}

DocToolBar.PropTypes = {
    bpm: React.PropTypes.array,
    edited: React.PropTypes.bool,
    docStatus: React.PropTypes.number
}

DocToolBar.defaultProps = {
    bpm: [],
    edited: false,
    docStatus: 0
}

module.exports = DocToolBar;