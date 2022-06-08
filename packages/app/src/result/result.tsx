import { FormGroup } from '@react-form-controller/hook/useForm/useForm.types';
import css from './result.module.scss';

export const Result = (formGroup: FormGroup): JSX.Element => {
    return (
        <div className={css.container}>
            <div className={css.boxTitle}>result</div>
            <div className={css.item}>
                <span>value: </span>
                <span id="value-box">{formGroup.controls.firstName.value}</span>
            </div>
            <div className={css.item}>
                <span>isDisabled: </span>
                <span id="is-disabled-box">
                    {JSON.stringify(formGroup.controls.firstName.isDisabled)}
                </span>
            </div>
            <div className={css.item}>
                <span>isValid: </span>
                <span id="is-valid-box">
                    {JSON.stringify(formGroup.controls.firstName.isValid)}
                </span>
            </div>
            <div className={css.item}>
                <span>isTouched: </span>
                <span id="is-touched-box">
                    {JSON.stringify(formGroup.controls.firstName.isTouched)}
                </span>
            </div>
            <div className={css.item}>
                <span>isDirty: </span>
                <span id="is-dirty-box">
                    {JSON.stringify(formGroup.controls.firstName.isDirty)}
                </span>
            </div>
            <div className={css.item}>
                <span>subscribed value: </span>
                <span id="subscribe-box">
                    {/* {JSON.stringify(formGroup.controls.firstName.)} */}
                </span>
            </div>
            <div className={css.item}>
                <span>errors: </span>
                <span id="errors-box">
                    <code>{JSON.stringify(formGroup.controls.firstName.errors)}</code>
                </span>
            </div>
        </div>
    );
};
