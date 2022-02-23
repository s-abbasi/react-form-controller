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

export const createFileInput = (): HTMLInputElement => {
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'file';
    return checkboxEl;
};

export const createFile = (type = 'image/jpg'): File => {
    const format = type.split('/')[1];
    const el = new File(['(⌐□_□)'], `imageName.${format}`, {
        type: type || 'image/png',
    });
    return el;
};

export const createSelectOptionsInput = (): HTMLSelectElement => {
    const select = document.createElement('select');

    const pets = ['ori', 'dog', 'cat', 'eagle'];

    pets.forEach((pet) => {
        const option = document.createElement('option');
        option.value = pet.toLowerCase();
        option.innerHTML = pet;
        select.appendChild(option);
    });

    return select;
};
