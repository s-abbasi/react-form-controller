import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../UseForm';
import { Form } from '../UseForm.types';
import { createSelectOptionsInput } from './helper';

describe('UseForm - typeof select', () => {
    test('should set "value" prop of returned UseForm on input on initial state', () => {
        const formModel: Form = {
            pet: { initialValue: 'ori' },
        };

        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;
        const selectOptionEl = createSelectOptionsInput();

        act(() => {
            form.pet.jsx.ref(selectOptionEl);
        });

        expect(selectOptionEl.value).toBe(formModel.pet.initialValue);
    });

    test.todo('should update "value" prop of returned UseForm on change event');
});
