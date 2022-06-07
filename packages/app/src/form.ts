import { required } from '../../hook/useForm/validations';
import { FormModel } from '../../hook/useForm/useForm.types';

export const formModel: FormModel = {
    firstName: {
        initialValue: '',
        validators: [required()],
    },
};
