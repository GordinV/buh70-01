'use strict';
module.exports = {
    validateForm: () => {
        console.log('validateForm this is mixin');
        // валидация формы
        let warning = '',
            now = new Date(),
            requiredFields = this.requiredFields || [],
            notRequiredFields = [],
            notMinMaxRule = [];

        requiredFields.forEach((field) => {
            let component = this.refs[field.name];

            let value = component.state.value,
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
                    if (controlledValueN === 0 || ((field.min && controlledValueN < field.min) && (field.max && controlledValueN > field.max))) {
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

        return warning; // вернем извещение об итогах валидации
    }
}
