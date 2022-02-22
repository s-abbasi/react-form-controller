import { cond, T } from 'ramda';
import { MutableRefObject } from 'react';
import {
    AttachListenerToEl,
    GetInputType,
    HTMLInputTypes,
    InputTypes,
    Ref,
    SetInitialValue,
} from './UseForm.types';

export const addElToRefs = (refs: MutableRefObject<Ref[]>) => {
    return (el: NonNullable<HTMLInputTypes>) => {
        const alreadyExist = refs.current.some((item) => item === el);
        if (!alreadyExist) {
            refs.current.push(el);
        }
        return el;
    };
};

export const setFormControllerValue: AttachListenerToEl = (obj) =>
    cond([
        [
            ({ type }) => type === 'text',
            ({ el }) => {
                el.addEventListener('input', (ev) => {
                    obj.value = (ev.target as HTMLInputElement).value;
                });
                return { el, type: 'text' };
            },
        ],
        [
            ({ type }) => type === 'checkbox',
            ({ el }) => {
                el.addEventListener('input', (ev) => {
                    obj.value = (ev.target as HTMLInputElement).checked;
                });
                return { el, type: 'checkbox' as InputTypes };
            },
        ],
        [
            ({ type }) => type === 'radio',
            ({ el }) => {
                el.addEventListener('input', (ev) => {
                    obj.value = (ev.target as HTMLInputElement).value;
                });
                return { el, type: 'radio' };
            },
        ],
        [
            ({ type }) => type === 'select-one',
            ({ el }) => {
                el.addEventListener('input', (ev) => {
                    obj.value = (ev.target as HTMLInputElement).value;
                });
                return { el, type: 'select-one' };
            },
        ],
    ]);

export const getElInputType: GetInputType = cond([
    [(el) => el.type === 'text', (el) => ({ type: 'text' as InputTypes, el })],
    [(el) => el.type === 'number', (el) => ({ type: 'number' as InputTypes, el })],
    [(el) => el.type === 'checkbox', (el) => ({ type: 'checkbox' as InputTypes, el })],
    [(el) => el.type === 'radio', (el) => ({ type: 'radio' as InputTypes, el })],
    [
        (el) => el.type === 'select-one',
        (el) => ({ type: 'select-one' as InputTypes, el }),
    ],
    [T, (el) => ({ type: 'text', el })],
]);

export const checkRefExistence = (refs: MutableRefObject<Ref[]>): boolean => {
    return refs.current.some((ref: Ref) => ref.contains(ref));
};

export const setInitialState: SetInitialValue = (fieldValue) =>
    cond([
        [
            (el) => el.type === 'text',
            (el) => {
                el.value = fieldValue.initialValue as string;
                el.disabled =
                    fieldValue?.disable !== undefined ? fieldValue.disable : false;
            },
        ],
        [
            (el) => el.type === 'checkbox',
            (el) => {
                (el as HTMLInputElement).checked = fieldValue.initialValue as boolean;
                (el as HTMLInputElement).disabled =
                    fieldValue?.disable !== undefined ? fieldValue.disable : false;
            },
        ],
        [
            (el) => el.type === 'radio',
            (el) => {
                (el as HTMLInputElement).checked = el.value === fieldValue.initialValue;
                (el as HTMLInputElement).disabled =
                    fieldValue?.disable !== undefined ? fieldValue.disable : false;
            },
        ],
        [
            (el) => el.type === 'select-one',
            (el) => {
                el.value = fieldValue.initialValue as string;
                el.disabled =
                    fieldValue?.disable !== undefined ? fieldValue.disable : false;
            },
        ],
    ]);
