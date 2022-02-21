import { StrictMode, useState } from 'react';
import { useForm } from '../useForm/UseForm';
import { Form } from '../useForm/UseForm.types';
import { minLength, maxLength } from '../validations/validations';

const formModel: Form = {
    name: {
        initialValue: 'hi',
        validations: [minLength(3), maxLength(10)],
    },
    single: { initialValue: true },
    contact: { initialValue: 'phone' },
    pet: { initialValue: 'ori' },
};

export function Test(): JSX.Element {
    const form = useForm(formModel);
    const [code, setCode] = useState(form);
    const [state, setState] = useState('');

    const log = (): void => {
        setCode(form);
    };

    return (
        <div style={{ color: '#cdcdcd' }}>
            <StrictMode>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                />
                <code>{JSON.stringify(code)}</code>
                <hr />
                <input type="text" {...form.name.jsx} />
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

                <label htmlFor="pet-select">
                    Choose a pet:
                    <select {...form.pet.jsx} name="pets" id="pet-select">
                        <option value="">choose an option</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="ori">Ori</option>
                        <option value="goldfish">Goldfish</option>
                    </select>
                </label>
                <hr />
                <button type="button" onClick={log}>
                    LOG
                </button>
            </StrictMode>
        </div>
    );
}
