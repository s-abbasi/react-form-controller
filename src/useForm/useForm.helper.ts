/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent } from 'react';
import {
    ControlError,
    ControlObjectModel,
    ControlPrimitiveValue,
    FormChangeEvent,
    Validator,
} from './useForm.types';

export const isTypeOfControlModel = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): controlValueType is ControlObjectModel => {
    return typeof controlValueType === 'object';
};

export const setDefaultChecked = (value: ControlPrimitiveValue): boolean | undefined => {
    const valueIsBoolean = typeof value === 'boolean';
    return valueIsBoolean ? (value as boolean) : undefined;
};

// export const generateJSXValueAttribute = (
//     value: unknown,
//     control: Required<ControlObjectModel>
// ): unknown => {
//     const valueIsBoolean = typeof value === 'boolean';

//     return valueIsBoolean
//         ? { defaultChecked: setDefaultChecked(control) }
//         : { defaultValue: value };
// };

export const generateControlErrorsProp = (
    value: ControlPrimitiveValue,
    validators: Validator[] = []
): ControlError => {
    // @ts-ignore
    return validators
        .filter((validator) => !validator.validateWith(value))
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.message }), {});
};

// export const generateControlInitialState: ControlConvertor = (control) => {
//     const { initialValue, validators, disabled } = control;

//     return {
//         value: initialValue,
//         isValid: generateControlIsValidProp(initialValue, validators),
//         errors: generateControlErrorsProp(initialValue, validators),
//         isTouched: false,
//         isDirty: false,
//         isDisabled: disabled,
//         disable() {
//             this.isDisabled = true;
//         },
//         enable() {
//             this.isDisabled = false;
//         },
//     };
// };

// export const generateControls: GenerateControls = (model) => {
//     const normalizedModel = normalizeFormModel(model);
//     return {
//         controls: mapObjIndexed(generateControlInitialState, normalizedModel),
//         normalizedModel,
//     };
// };

export const getValueBasedOnType = (e: FormChangeEvent): ControlPrimitiveValue => {
    const eventIsPrimitive = e && typeof e !== 'object';

    if (eventIsPrimitive) {
        return e;
    }

    const { target } = e as ChangeEvent<HTMLInputElement>;
    switch (target.type) {
        case 'checkbox':
            return (target as HTMLInputElement).checked;

        case 'radio':
            return (target as HTMLInputElement).value;

        case 'file':
            if (target.files) {
                return target.files[0];
            }
            console.warn('file input has returned undefined');
            return undefined;

        default:
            return target.value;
    }
};
