import { FormModel } from '../../useForm/useForm.types';
// import { required, pattern, min, max } from '../../useForm/validations';

export const formModel: FormModel = {
    materialTextField: {
        initialValue: 'sajad abbasi',
        validators: [],
        // disabled: true,
    },
    customInput: {
        initialValue: 'custom input value',
        validators: [],
        disabled: false,
    },
    category: {
        initialValue: 'sale',
    },
    firstName: {
        initialValue: 'sajad',
        // validators: [],
    },
    lastName: {
        initialValue: 'abbasi',
        // validators: [],
    },
    cellphone: {
        initialValue: '',
        // validators: [required(), pattern('patternName', /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/)],
    },
    price: {
        initialValue: undefined,
        // validators: [min(50), max(100), required()],
    },
    single: {
        initialValue: true,
        // validators: [required()],
        // disabled: true,
    },
    contact: {
        initialValue: 'phone',
        // validators: [required()],
        disabled: false,
    },
    image: {
        initialValue: undefined,
        // validators: [required()],
        // disabled: true,
    },
    description: {
        initialValue: '',
        // validators: [required()],
    },
};
