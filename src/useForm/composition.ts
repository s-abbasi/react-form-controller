/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { compose } from 'ramda';
import {
    AddBindToFormGroup,
    AddControlsToFormGroup,
    ConvertModelToControls,
} from './composition.type';
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

type GenerateFormGroup = (
    formGroup: FormGroup
) => (model: FormModel) => Required<FormGroup>;

const convertModelToControls: ConvertModelToControls = (model) => {
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
                if (this._cb.length > 0) {
                    this._cb.forEach((cb) => cb(this.value));
                }
            },
            subscribe(cb) {
                this._cb.push(cb);
            },
            _cb: [],
        };
        return { ...prev, [key]: control };
    }, {});

    return { controls, model };
};

// TODO: model should not be cached in here
let cachedModel: NormalizedModel = {};

const addBindToFormGroup: AddBindToFormGroup = ({ formGroup, model }) => {
    formGroup.bind = (controlName: string) => {
        const initialValue = formGroup.controls[controlName].value;
        const valueIsBoolean = typeof initialValue === 'boolean';
        const defaultChecked = setDefaultChecked(initialValue);
        cachedModel = { ...cachedModel, ...model };
        const { validators } = cachedModel[controlName];

        return {
            onChange: (e) => {
                // why? native inputs send "object" as e, custom inputs send "primitives"
                const control = formGroup.controls[controlName];
                const value = typeof e === 'object' ? getValueBasedOnType(e) : e;
                formGroup.isDirty = true;
                formGroup.isValid = generateFormGroupIsValidProp(formGroup.controls);
                control.setValue(value);
                control.isDirty = true;
                control.isValid = generateControlIsValidProp(value, validators);
                control.errors = generateControlErrorsProp(value, validators);
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
    return formGroup;
};

const addControlsToFormGroup: AddControlsToFormGroup =
    (formGroup) =>
    ({ controls, model }) => {
        formGroup.controls = { ...formGroup.controls, ...controls };
        formGroup.isValid = generateFormGroupIsValidProp(formGroup.controls);
        return { formGroup, model };
    };

const addControlAddRemove = (formGroup: FormGroup): Required<FormGroup> => {
    formGroup.add = (model) => {
        // TODO: guard against existing controls
        generateFormGroup(formGroup)(model);
    };
    formGroup.remove = (controlName: string | string[]) => {
        const isTypeOfArray = Array.isArray(controlName);
        if (isTypeOfArray) {
            controlName.forEach((name) => delete formGroup.controls[name]);
        } else {
            delete formGroup.controls[controlName];
        }
    };
    return formGroup as Required<FormGroup>;
};

export const generateFormGroup: GenerateFormGroup = (formGroup) => {
    return compose(
        addControlAddRemove,
        addBindToFormGroup,
        addControlsToFormGroup(formGroup),
        convertModelToControls,
        normalizeModel
    );
};
