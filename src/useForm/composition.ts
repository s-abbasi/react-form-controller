/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { compose } from 'ramda';
import {
    generateControlErrorsProp,
    getValueBasedOnType,
    setDefaultChecked,
} from './useForm.helper';
import {
    Control,
    DefaultValue,
    FormGroup,
    FormModel,
    NormalizedModel,
} from './useForm.types';

import {
    generateControlIsValidProp,
    generateFormGroupIsValidProp,
} from './useForm.validations';

export const normalizeModel = (model: FormModel): NormalizedModel => {
    const requiredValues = {
        disabled: false,
        adapter: undefined,
        validators: [],
    };

    return Object.entries(model).reduce((prev, [key, value]) => {
        if (typeof value !== 'object') {
            return {
                ...prev,
                [key]: { ...requiredValues, initialValue: value },
            };
        }
        return {
            ...prev,
            [key]: { ...requiredValues, ...value },
        };
    }, {});
};

type GenerateFormGroup = (model: FormModel) => Required<FormGroup>;

const baseFormGroup: FormGroup = {
    controls: {},
    bind: undefined,
    isValid: false,
    isTouched: false,
    isDirty: false,
    add: undefined,
    remove: undefined,
    reset: undefined,
};

const attachControlsToFormGroup = (model: NormalizedModel): FormGroup => {
    const controls = Object.entries(model).reduce((prev, [key, value]) => {
        const { initialValue, validators, disabled } = value;

        const control: Control = {
            value: initialValue,
            isTouched: false,
            isDirty: false,
            isValid: generateControlIsValidProp(initialValue, validators),
            errors: generateControlErrorsProp(initialValue, validators),
            isDisabled: disabled,
            disable() {
                this.isDisabled = true;
            },
            enable() {
                this.isDisabled = false;
            },
            setValue(v) {
                this.value = v;
                this.isDirty = true;
                formGroup.isDirty = true;
                if (this._subscribeCallbacks.length > 0) {
                    this._subscribeCallbacks.forEach((cb) => cb(this.value));
                }
            },
            reset() {
                const controlModel: NormalizedModel = { [key]: model[key] };
                const newControl = attachControlsToFormGroup(controlModel).controls[key];
                baseFormGroup.controls[key] = newControl;
            },
            subscribe(cb) {
                this._subscribeCallbacks.push(cb);
            },
            addValidator(validator) {
                if (Array.isArray(validator)) {
                    this._validators.push(...validator);
                } else {
                    this._validators.push(validator);
                }
                this.isValid = generateControlIsValidProp(this.value, this._validators);
                this.errors = generateControlErrorsProp(this.value, this._validators);
                baseFormGroup.isValid = generateFormGroupIsValidProp(
                    baseFormGroup.controls
                );
            },
            removeValidator(validatorName) {
                if (Array.isArray(validatorName)) {
                    this._validators = this._validators.filter(
                        (validator) => !validatorName.includes(validator.name)
                    );
                } else {
                    this._validators = this._validators.filter(
                        (validator) => validator.name !== validatorName
                    );
                }
                this.isValid = generateControlIsValidProp(this.value, this._validators);
                baseFormGroup.isValid = generateFormGroupIsValidProp(
                    baseFormGroup.controls
                );
            },
            _subscribeCallbacks: [],
            _validators: [...validators],
        };

        return { ...prev, [key]: control };
    }, {});

    baseFormGroup.controls = { ...baseFormGroup.controls, ...controls };
    baseFormGroup.isValid = generateFormGroupIsValidProp(baseFormGroup.controls);
    baseFormGroup.reset = () => {
        Object.entries(baseFormGroup.controls).forEach(([, value]) => {
            value.reset();
        });
        baseFormGroup.isDirty = false;
        baseFormGroup.isTouched = false;
    };
    const formGroup = baseFormGroup;
    return formGroup;
};

const attachBindToFormGroup = (formGroup: FormGroup): Required<FormGroup> => {
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

const attachAddRemoveControlToFormGroup = (
    formGroup: Required<FormGroup>
): Required<FormGroup> => {
    formGroup.add = (model) => {
        // TODO: guard against existing controls
        generateFormGroup(model);
    };
    formGroup.remove = (controlName: string | string[]) => {
        const isTypeOfArray = Array.isArray(controlName);
        if (isTypeOfArray) {
            controlName.forEach((name) => delete formGroup.controls[name]);
        } else {
            delete formGroup.controls[controlName];
        }
    };
    return formGroup;
};

export const generateFormGroup: GenerateFormGroup = compose(
    attachAddRemoveControlToFormGroup,
    attachBindToFormGroup,
    attachControlsToFormGroup,
    normalizeModel
);
