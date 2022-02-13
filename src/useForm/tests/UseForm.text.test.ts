import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../UseForm';
import { Form } from '../UseForm.types';

const formModel: Form = {
    name: { initialValue: '', disable: true },
    remember: { initialValue: false },
    gender: { initialValue: 'male' },
};

describe('UseForm - typeof text', () => {
    test('should update "value" prop of returned UseForm on input change event', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const inputTextEl: HTMLInputElement = document.createElement('input');
        inputTextEl.type = 'text';

        act(() => {
            form.name.jsx.ref(inputTextEl);
            fireEvent.input(inputTextEl, { target: { value: 'sajad' } });
        });

        expect(form.name.value).toBe('sajad');
    });

    test('should update "value" prop of returned UseForm on input change event without type of input specified', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const input: HTMLInputElement = document.createElement('input');

        act(() => {
            form.name.jsx.ref(input);
            fireEvent.input(input, { target: { value: 'sajad' } });
        });

        expect(form.name.value).toBe('sajad');
    });

    test('should set "disable" value of HTMLInputElement to value passed to formModel', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        const input: HTMLInputElement = document.createElement('input');

        act(() => {
            form.name.jsx.ref(input);
        });

        expect(input.disabled).toBe(formModel.name.disable);
    });
});
