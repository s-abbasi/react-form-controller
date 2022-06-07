/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { FormGroup, DefaultValue, AddToRef } from '../useForm.types';
import {
    setDefaultChecked,
    getValueBasedOnType,
    generateControlErrorsProp,
} from '../useForm.helper';
import {
    generateFormGroupIsValidProp,
    generateControlIsValidProp,
} from '../useForm.validations';

export const attachBindToFormGroup =
    (addToRef: AddToRef, rerender: () => void) =>
    (formGroup: FormGroup): Required<FormGroup> => {
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
                    control.value = value;
                    control.isDirty = true;
                    control.isValid = generateControlIsValidProp(
                        value,
                        control._validators
                    );
                    control.errors = generateControlErrorsProp(
                        value,
                        control._validators
                    );
                    if (control._subscribeCallbacks.length > 0) {
                        control._subscribeCallbacks.forEach((cb) => cb(value));
                    }
                    rerender();
                },
                onBlur: () => {
                    formGroup.controls[controlName].isTouched = true;
                    formGroup.isTouched = true;
                    rerender();
                },
                disabled: formGroup.controls[controlName].isDisabled as boolean,
                ...(valueIsBoolean && { defaultChecked }),
                ...(!valueIsBoolean && {
                    defaultValue: formGroup.controls[controlName].value as DefaultValue,
                }),
                ref: (ref: HTMLInputElement) => {
                    if (ref) {
                        formGroup.controls[controlName].type = ref.type;
                        addToRef(controlName, ref);
                    }
                },
            };
        };
        return formGroup as Required<FormGroup>;
    };
