'use strict';

var React = require('react'),
    DocButtonAdd = require('../components/doc-button-add.jsx'),
    DocButtonEdit = require('../components/doc-button-edit.jsx'),
//    DocButtonDelete = require('../components/doc-button-delete.jsx'),
    DocButtonSave = require('../components/doc-button-save.jsx'),
    flux = require('fluxify');


//    DocButtonPrint = require('../components/doc-button-print.jsx')

var Toolbar = React.createClass({
    getInitialState: function() {
      return {warning: false, warningMessage: '', editMode: false,
          taskList: this.props.taskList}
    },

    getDefaultProps: function () {
      return  {
          taskList: [{step:0, name:'Start', action: 'start', status: 'opened'}]
      }
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;

        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                self.setState({editMode:!newValue});
            }
        });

/*
        flux.stores.docStore.on('change:bpm', function(newValue, previousValue) {
            console.log('change:bpm', newValue);
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                let data = flux.stores.docStore.data;
                if (data.bpm) {
                    var tasks = newValue.filter(task => {
                        console.log('change:bpm filter', task)
                        if (task.status == 'opened' )  {
                            return task
                        }});

                    self.setState({taskList:tasks});
                }
            }
        });
*/

    },

    handleSelectTask: function(e) {
        // метод вызывается при выборе задачи
        var taskValue = e.target.value;
      console.log('toolbar onChange, taskValue', taskValue);
    },

    handleButtonTask: function() {
        // метод вызывается при выборе задачи
        console.log('toolbar onClick', this.state.taskList);
        var tasks = this.state.taskList.map((task) => {return task.action});
        flux.doAction('executeTask', tasks);
    },

    render: function () {
        var editeMode = this.state.editMode,
            taskWidget = this.generateTaskWidget();


        return (
            <div>
                <div className='doc-toolbar-warning'>
                    {this.state.warning? <span>{this.state.warningMessage}</span>: null }
                </div>
                <div className='doc-toolbar'>
                    <DocButtonAdd value='Add' className='doc-toolbar'/>
                    <DocButtonEdit value='Edit' className='doc-toolbar'> Edit </DocButtonEdit>
                    <DocButtonSave validator={this.validator} className='doc-toolbar'> Save </DocButtonSave>
                    {editeMode && tasks.length > 0 ? null : taskWidget}

                </div>
            </div>
        );
    },

    generateTaskWidget: function() {
        // вернет виджет задач
        var tasks = this.state.taskList.filter(task => {
                if (task.status === 'opened') {
                    return task;
                }
            }),
            options,
            taskWidget = null;

        console.log('generateTaskWidget task', this.state, tasks);

        if (tasks.length > 1) {
            // формируем список задач
            options = tasks.map((task) => {
                    return <option value={0} key= {Math.random()}> {task.name} </option>
            });

            taskWidget = <select className='ui-c2' onChange={this.handleSelectTask}>{options} </select>
        }

        if (tasks.length == 1)
        {
            // кнопка с задачей
            console.log('tasks', tasks);
            taskWidget = <input type ="button" className='ui-c2' onClick={this.handleButtonTask} value= {tasks[0].name}/>
        }
        return taskWidget;
    },

    validator: function () {
        if (this.props.validator) {
            var warningMessage = this.props.validator(),
                warning =  warningMessage !== 'Ok';

            this.setState({ warningMessage:  warningMessage, warning: warning})
        }
        return warning;
    }


});

module.exports = Toolbar;


