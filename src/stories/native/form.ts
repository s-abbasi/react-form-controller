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
        initialValue: 'sajad',
        validators: [minLength(2), maxLength(10), required()],
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
    },
    contact: {
        initialValue: 'phone',
        validators: [required()],
    },
    image: {
        initialValue: undefined,
        validators: [required()],
    },
    description: {
        initialValue: '',
        validators: [required()],
    },
};
