import { FormModel } from '../../useForm/useForm.types';
import { max, min, minlength, maxlength } from '../../validations/validations';

export const formModel: FormModel = {
    firstName: {
        defaultValue: 'sajad',
        validators: [minlength(2), maxlength(10)],
    },
    lastName: {
        defaultValue: '',
    },
    price: {
        defaultValue: 0,
        validators: [min(50), max(100)],
    },
    single: {
        defaultValue: true,
    },
    contact: {
        defaultValue: 'phone',
    },
    image: {
        defaultValue: undefined,
    },
    description: {
        defaultValue: '',
    },
};
