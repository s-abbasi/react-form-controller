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
    firstName: {
        defaultValue: 'sajad',
        validators: [minLength(2), maxLength(10), required()],
    },
    lastName: {
        defaultValue: '',
        validators: [required()],
    },
    cellphone: {
        defaultValue: '',
        validators: [required(), pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
    },
    price: {
        defaultValue: undefined,
        validators: [min(50), max(100), required()],
    },
    single: {
        defaultValue: true,
        validators: [required()],
    },
    contact: {
        defaultValue: 'phone',
        validators: [required()],
    },
    image: {
        defaultValue: undefined,
        validators: [required()],
    },
    description: {
        defaultValue: '',
        validators: [required()],
    },
};
