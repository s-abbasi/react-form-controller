import { mapObjIndexed } from 'ramda';
import { MutableRefObject, useRef } from 'react';
import { ElRef, Form, JSXProp, JSXRef, UseForm } from './UseForm.types';

const addToRefs = (
    refs: MutableRefObject<JSXRef[]>,
    el: ElRef,
    key: keyof Form
): void => {
    if (el) {
        refs.current.push({ fieldName: key, ref: el });
    }
};

// const x: number = 1;

const generateJSX = (form: Form, refs: MutableRefObject<JSXRef[]>): UseForm => {
    const convertor = (_: Form[keyof Form], key: keyof Form): JSXProp => ({
        jsx: {
            ref: (el): void => {
                addToRefs(refs, el, key);
            },
        },
    });
    return mapObjIndexed(convertor, form);
};

export const useForm = (form: Form): UseForm => {
    const refs = useRef<JSXRef[]>([]);
    return generateJSX(form, refs);
};
