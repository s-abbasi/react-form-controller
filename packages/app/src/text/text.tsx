import { formModel } from '../form';
import { useForm } from '@react-form-controller/hook';
import { RenderCounter } from '../render-counter/render-counter';
import css from './text.module.scss';
import { Result } from '../result/result';
import { Actions } from '../actions/actions';
import { InputContainer } from '../input-container/input-container';

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
                <Actions {...form} />
                <Result {...form} />
            </div>
        </div>
    );
};
