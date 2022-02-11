/* eslint-disable no-console */
import { StrictMode, useState } from 'react';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';

const formModel: Form = {
    firstName: { initialValue: 'sajad' },
    lastName: { initialValue: 'abbasi' },
    single: { initialValue: true },
    contact: { initialValue: 'phone' },
};

export function Test(): JSX.Element {
    const form = useForm(formModel);
    const [code, setCode] = useState(form);

    const log = (): void => {
        console.log(form);
        setCode(form);
    };

    return (
        <div style={{ color: '#cdcdcd' }}>
            <StrictMode>
                <code>{JSON.stringify(code)}</code>
                <hr />
                <input type="text" {...form.firstName.jsx} />
                <br />
                <label htmlFor="chb">
                    <input type="checkbox" {...form.single.jsx} />
                    checkbox
                </label>

                <div>
                    <label htmlFor="contactChoice1">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice1"
                            name="contact"
                            value="email"
                        />
                        Email
                    </label>
                    <label htmlFor="contactChoice2">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice2"
                            name="contact"
                            value="phone"
                        />
                        Phone
                    </label>
                    <label htmlFor="contactChoice3">
                        <input
                            {...form.contact.jsx}
                            type="radio"
                            id="contactChoice3"
                            name="contact"
                            value="fax"
                        />
                        Fax
                    </label>
                </div>
                <button type="button" onClick={log}>
                    LOG
                </button>
            </StrictMode>
        </div>
    );
}
