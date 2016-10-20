'use strict';

let validateForm = ((self, reqFields) => {

        // валидация формы
        let warning = '',
            requiredFields = reqFields || [],
            notRequiredFields = [],
            notMinMaxRule = [];

    console.log('validateForm self', self);
        requiredFields.forEach((field) => {

            let component = self.refs[field.name],
                value = component.state.value,
                props = component.props,
                title = props.title;

            if (!value) {
                notRequiredFields.push(title);
            }
            // проверка на мин . макс значения

            // || value && value > props.max
            let checkValue = false;

            switch (field.type) {
                case 'D':
                    let controlledValueD = Date.parse(value);
                    if ((field.min && controlledValueD < field.min) && (field.max && controlledValueD > field.max)) {
                        checkValue = true;
                    }
                    break;
                case 'N':
                    let controlledValueN = Number(value);

                    if (field.min && controlledValueN === 0 ||
                        ((field.min && controlledValueN < field.min) && (field.max && controlledValueN > field.max))) {
                        checkValue = true;
                    }
                    break;
                /*
                 default:
                 checkValue = true;
                 break;
                 */
            }
            if (checkValue) {
                notMinMaxRule.push(title);
            }
        });

        if (notRequiredFields.length > 0) {
            warning = 'puudub vajalikud andmed (' + notRequiredFields.join(', ') + ') ';
        }

        if (notMinMaxRule.length > 0) {
            warning = warning + ' min/max on vale(' + notMinMaxRule.join(', ') + ') ';
        }

        if (warning.length == 0) {
            warning = 'Ok';
        }

        console.log('validation warning:', warning);
        return warning; // вернем извещение об итогах валидации
    });

module.exports = validateForm;
