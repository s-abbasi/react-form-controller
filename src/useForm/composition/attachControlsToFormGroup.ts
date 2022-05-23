/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { generateControlErrorsProp } from '../useForm.helper';
import { NormalizedModel, FormGroup, Control } from '../useForm.types';
import {
    generateControlIsValidProp,
    generateFormGroupIsValidProp,
} from '../useForm.validations';

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

export const attachControlsToFormGroup = (model: NormalizedModel): FormGroup => {
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
