import { JSXBinding } from '../../useForm/useForm.types';

export const CustomInput = (props: JSXBinding): JSX.Element => {
    return (
        <>
            <span>label:</span>
            <div
                style={{ background: 'lightgrey' }}
                suppressContentEditableWarning
                contentEditable={!props.disabled}
                onInput={(e) => props.onChange(e.currentTarget.textContent)}
                onBlur={(e) => props.onBlur(e.currentTarget.textContent)}
            >
                {props.defaultValue}
            </div>
            is disabled: {JSON.stringify(props.disabled)}
        </>
    );
};
