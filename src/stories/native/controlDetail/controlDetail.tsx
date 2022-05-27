/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import { Control, Validator } from '../../../useForm/useForm.types';

type Prop = {
    control: Control;
    setValueInput: string;
    newValidators?: Validator[];
    removeValidators?: string[];
};

const css = {
    container: {
        background: '#cdcdcd',
        marginTop: 10,
        marginBottom: 20,
        padding: '10px',
    },
    cell: { border: '1px solid grey', textAlign: 'middle' },
};

const setBooleanStyle = (value: boolean) => {
    return { background: value ? 'green' : 'red' };
};

export const ControlDetail = ({
    control,
    setValueInput,
    newValidators = [],
    removeValidators = [],
}: Prop): JSX.Element => {
    return (
        <div style={css.container}>
            Props that needed to be reflected on rerender
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tr style={css.cell}>
                    <th style={css.cell}>value</th>
                    <th style={css.cell}>isValid</th>
                    <th style={css.cell}>error messages</th>
                    <th style={css.cell}>isTouched</th>
                    <th style={css.cell}>isDirty</th>
                    <th style={css.cell}>isDisabled</th>
                </tr>
                <tr>
                    <td style={css.cell}>{control.value}</td>
                    <td style={setBooleanStyle(control.isValid)}>
                        {JSON.stringify(control.isValid)}
                    </td>
                    <td style={css.cell}>{JSON.stringify(control.errors)}</td>
                    <td style={setBooleanStyle(control.isTouched)}>
                        {JSON.stringify(control.isTouched)}
                    </td>
                    <td style={setBooleanStyle(control.isDirty)}>
                        {JSON.stringify(control.isDirty)}
                    </td>
                    <td style={setBooleanStyle(control.isDisabled)}>
                        {JSON.stringify(control.isDisabled)}
                    </td>
                </tr>
            </table>
            <div style={{ marginTop: 10 }}>
                <button onClick={() => control.setValue(setValueInput)}>
                    setValue({setValueInput})
                </button>
                <button onClick={() => control.enable()}>enable()</button>
                <button onClick={() => control.disable()}>disable()</button>
                <button
                    onClick={() => {
                        newValidators.forEach((item) => control?.addValidator(item));
                    }}
                >
                    addValidator({JSON.stringify(newValidators)})
                </button>
                <button
                    onClick={() => {
                        removeValidators.forEach((item) =>
                            control?.removeValidator(item)
                        );
                    }}
                >
                    removeValidators({JSON.stringify(newValidators)})
                </button>
                <button onClick={() => control.reset()}>reset()</button>
            </div>
        </div>
    );
};
