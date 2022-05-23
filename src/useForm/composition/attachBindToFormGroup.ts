/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import {
    setDefaultChecked,
    getValueBasedOnType,
    generateControlErrorsProp,
} from '../useForm.helper';
import { FormGroup, DefaultValue } from '../useForm.types';
import {
    generateFormGroupIsValidProp,
    generateControlIsValidProp,
} from '../useForm.validations';

export const attachBindToFormGroup = (formGroup: FormGroup): Required<FormGroup> => {
    formGroup.bind = (controlName: string) => {
        const initialValue = formGroup.controls[controlName].value;
        const valueIsBoolean = typeof initialValue === 'boolean';
        const defaultChecked = setDefaultChecked(initialValue);

        return {
            onChange: (e) => {
                // why? native inputs send "object" as e, custom inputs send "primitives"
                const control = formGroup.controls[controlName];
                const value = typeof e === 'object' ? getValueBasedOnType(e) : e;
                formGroup.isDirty = true;
                formGroup.isValid = generateFormGroupIsValidProp(formGroup.controls);
                control.setValue(value);
                control.isDirty = true;
                control.isValid = generateControlIsValidProp(value, control._validators);
                control.errors = generateControlErrorsProp(value, control._validators);
            },
            onBlur: () => {
                formGroup.controls[controlName].isTouched = true;
                formGroup.isTouched = true;
            },
            disabled: formGroup.controls[controlName].isDisabled as boolean,
            ...(valueIsBoolean && { defaultChecked }),
            ...(!valueIsBoolean && { defaultValue: initialValue as DefaultValue }),
        };
    };
    return formGroup as Required<FormGroup>;
};
