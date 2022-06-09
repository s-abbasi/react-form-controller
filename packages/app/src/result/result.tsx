import { FormGroup } from '@react-form-controller/hook/useForm/useForm.types';
import css from './result.module.scss';

type Prop = {
    form: FormGroup;
    controlName: string;
};

export const Result = ({ form, controlName }: Prop): JSX.Element => {
    const control = form.controls[controlName];

    return (
        <div className={css.container}>
            <div className={css.boxTitle}>result</div>
            <div className={css.item}>
                <span>value: </span>
                <span id="value-box">{JSON.stringify(control.value)}</span>
            </div>
            <div className={css.item}>
                <span>isDisabled: </span>
                <span id="is-disabled-box">{JSON.stringify(control.isDisabled)}</span>
            </div>
            <div className={css.item}>
                <span>isValid: </span>
                <span id="is-valid-box">{JSON.stringify(control.isValid)}</span>
            </div>
            <div className={css.item}>
                <span>isTouched: </span>
                <span id="is-touched-box">{JSON.stringify(control.isTouched)}</span>
            </div>
            <div className={css.item}>
                <span>isDirty: </span>
                <span id="is-dirty-box">{JSON.stringify(control.isDirty)}</span>
            </div>
            <div className={css.item}>
                <span>subscribed value: </span>
                <span id="subscribe-box">{/* {JSON.stringify(control.)} */}</span>
            </div>
            <div className={css.item}>
                <span>errors: </span>
                <span id="errors-box">
                    <code>{JSON.stringify(control.errors)}</code>
                </span>
            </div>
        </div>
    );
};
