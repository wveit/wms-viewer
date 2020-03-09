export function createDropdownOption(name, index) {
    const option = document.createElement("option");
    option.innerHTML = name;
    option.value = index;
    return option;
}

export function clearChildElements(parentElement) {
    while(parentElement.lastChild) {
        parentElement.removeChild(parentElement.lastChild);
    }
}

export function addDropdownItem(dropdown, name, index) {
    const newOption = createDropdownOption(name, index);
    dropdown.appendChild(newOption);
}

export function populateDropdown(dropdown, array) {
    array.forEach((value, index) => addDropdownItem(dropdown, value, index));
}