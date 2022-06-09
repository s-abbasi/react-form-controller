import { useForm } from '@react-form-controller/hook';
import { FormModel } from '@react-form-controller/hook/useForm/useForm.types';
import { Actions } from '../actions/actions';
import { InputContainer } from '../input-container/input-container';
import { RenderCounter } from '../render-counter/render-counter';
import { Result } from '../result/result';
import css from './radio.module.scss';

const formModel: FormModel = {
    contact: {
        initialValue: 'phone',
    },
};

export const Radio = (): JSX.Element => {
    const form = useForm(formModel);

    return (
        <div className={css.container}>
            <RenderCounter />
            <div className={css.textContainer}>
                <p>RADIO</p>
                <InputContainer>
                    <input
                        id="phone-inp"
                        type="radio"
                        name="group"
                        {...form.bind('contact')}
                        defaultValue="phone"
                    />
                    <label htmlFor="phone-inp">phone</label>

                    <input
                        id="email-inp"
                        type="radio"
                        name="group"
                        {...form.bind('contact')}
                        defaultValue="email"
                    />
                    <label htmlFor="email-inp">email</label>

                    <input
                        id="sms-inp"
                        type="radio"
                        name="group"
                        {...form.bind('contact')}
                        defaultValue="sms"
                    />
                    <label htmlFor="sms-inp">sms</label>
                </InputContainer>
                <Actions form={form} controlName="contact" setValueTo="sms" />
                <Result form={form} controlName="contact" />
            </div>
        </div>
    );
};
