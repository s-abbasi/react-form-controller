import { useForm, required } from '@react-form-controller/hook';
import { RenderCounter } from '../render-counter/render-counter';
import css from './text.module.scss';
import { Result } from '../result/result';
import { Actions } from '../actions/actions';
import { InputContainer } from '../input-container/input-container';
import { FormModel } from '@react-form-controller/hook/useForm/useForm.types';

export const formModel: FormModel = {
    firstName: {
        initialValue: '',
        validators: [required()],
        disabled: false,
    },
};
export const Text = (): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div className={css.container}>
            <RenderCounter />
            <div className={css.textContainer}>
                <p>TEXT</p>
                <InputContainer>
                    <label htmlFor="firstName">first name</label>
                    <input {...form.bind('firstName')} type="text" id="firstNameInput" />
                </InputContainer>
                <Actions form={form} controlName="firstName" setValueTo="sara" />
                <Result form={form} controlName="firstName" />
            </div>
        </div>
    );
};
