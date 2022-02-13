import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { createCheckboxInput } from './helper';
import { Form } from '../UseForm.types';
import { useForm } from '../UseForm';

const formModel: Form = {
    remember: { initialValue: false, disable: true },
};

describe('UseForm - typeof checkbox', () => {
    test('should update "value" prop of returned UseForm on input change event', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const checkboxEl = createCheckboxInput();

        act(() => {
            form.remember.jsx.ref(checkboxEl);
        });

        fireEvent.input(checkboxEl, { target: { checked: true } });

        expect(form.remember.value).toBe(true);
    });

    test('should set "disable" value of HTMLInputElement to value passed to formModel', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const checkboxEl = createCheckboxInput();

        act(() => {
            form.remember.jsx.ref(checkboxEl);
        });

        expect(checkboxEl.disabled).toBe(formModel.remember.disable);
    });
});
