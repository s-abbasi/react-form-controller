/* eslint-disable no-console */
import { FormModel } from '../../useForm/useForm.types';
import {
    max,
    min,
    minLength,
    maxLength,
    required,
    pattern,
} from '../../validations/validations';

export const formModel: FormModel = {
    materialTextField: {
        initialValue: 'sajad abbasi',
        validators: [],
        disabled: true,
    },
    customInput: {
        initialValue: 'custom input value',
        validators: [],
        disabled: false,
    },
    firstName: {
        initialValue: 'sajad',
        validators: [minLength(2), maxLength(10), required()],
        disabled: false,
    },
    lastName: {
        initialValue: '',
        validators: [required()],
        disabled: true,
    },
    cellphone: {
        initialValue: '',
        validators: [required(), pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
    },
    price: {
        initialValue: undefined,
        validators: [min(50), max(100), required()],
    },
    single: {
        initialValue: true,
        validators: [required()],
        disabled: true,
    },
    contact: {
        initialValue: 'phone',
        validators: [required()],
        disabled: true,
    },
    image: {
        initialValue: undefined,
        validators: [required()],
        disabled: true,
    },
    description: {
        initialValue: '',
        validators: [required()],
    },
};
