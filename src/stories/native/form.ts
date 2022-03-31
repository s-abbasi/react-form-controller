import { FormModel } from '../../useForm/useForm.types';
import { max, min } from '../../validations/validations';

export const formModel: FormModel = {
    firstName: {
        defaultValue: '1',
        validators: [min(2), max(3)],
    },
    lastName: {
        defaultValue: '',
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
