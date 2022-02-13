export const createTextInput = (): HTMLInputElement => {
    const input = document.createElement('input');
    input.type = 'text';
    return input;
};

export const createCheckboxInput = (): HTMLInputElement => {
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    return checkboxEl;
};
