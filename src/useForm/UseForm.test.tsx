import { renderHook } from '@testing-library/react-hooks';
import { Form } from './UseForm.types';
import { useForm } from './UseForm';

const formModel: Form = {
    name: { initialValue: '', disable: true },
    remember: { initialValue: false, disable: true },
    gender: { initialValue: 'male' },
};

describe('UseForm', () => {
    test('should set "value" prop of returned UseForm to given initialValue', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;
        expect(form.name.value).toBe(formModel.name.initialValue);
    });

    test('should set "disable" prop value of returned UseForm to value passed to formModel', () => {
        const hook = renderHook(() => useForm(formModel));
        const form = hook.result.current;

        expect(form.name.disable).toBe(formModel.name.disable);
    });
});
