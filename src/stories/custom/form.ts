/* eslint-disable no-console */
import { FormModel } from '../../useForm/useForm.types';
import { maxLength, minLength, required } from '../../useForm/validations';

export const formModel: FormModel = {
    customInput: {
        initialValue: 'sajad',
        validators: [minLength(2), maxLength(10), required()],
        disabled: true,
    },
};
