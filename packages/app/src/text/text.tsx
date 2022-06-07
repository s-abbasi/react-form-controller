import { formModel } from '../form';
import { useForm } from '@react-form-controller/hook';
import { RenderCounter } from '../render-counter/render-counter';
import css from './text.module.scss';

export const Text = (): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div className={css.container}>
            <RenderCounter />
            <div className={css.textContainer}>
                <h1>TEXT</h1>
                <label htmlFor="firstName">first name</label>
                <input {...form.bind('firstName')} type="text" id="firstName" />
                <div>
                    value:
                    <span>{form.controls.firstName.value}</span>
                </div>
            </div>
        </div>
    );
};
