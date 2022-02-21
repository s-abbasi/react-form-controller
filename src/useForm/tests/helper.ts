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
