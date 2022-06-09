import { useForm, required } from '@react-form-controller/hook';
import { RenderCounter } from '../render-counter/render-counter';
import css from './checkbox.module.scss';
import { Result } from '../result/result';
import { Actions } from '../actions/actions';
import { InputContainer } from '../input-container/input-container';
import { FormModel } from '@react-form-controller/hook/useForm/useForm.types';

export const formModel: FormModel = {
    rememberMe: {
        initialValue: false,
        validators: [required()],
    },
};
export const Checkbox = (): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div className={css.container}>
            <RenderCounter />
            <div className={css.textContainer}>
                <p>CHECKBOX</p>
                <InputContainer>
                    <label htmlFor="checkbox-inp">remember me</label>
                    <input {...form.bind('rememberMe')} type="checkbox" id="checkbox-inp" />
                </InputContainer>
                <Actions form={form} controlName="rememberMe" setValueTo={true} />
                <Result form={form} controlName="rememberMe" />
            </div>
        </div>
    );
};
