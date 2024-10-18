const gosNumberInput = document.querySelector('#gosNumber');
const dateInput = document.querySelector('#date');
const passSeriesInput = document.querySelector('#passSeries');
const passNumInput = document.querySelector('#passNum');
const submitBtn = document.querySelector('.block__form-buttons-submit');
const inputs = document.querySelectorAll('.block__input input[type="text"]');

inputs.forEach(input => {
    input.addEventListener("input", ()=>{
        localStorage.setItem(input.id, input.value);
    })
    if (localStorage.getItem(input.id)) {
        input.value = localStorage.getItem(input.id);
    }
})
gosNumberInput.addEventListener("input",  () =>{
    let value = gosNumberInput.value.toUpperCase().replace(/[^А-Я0-9]/g, "");
    let formattedValue = "";
    if (value.length > 6) {
        value = value.substring(0, 6);
    }
    for (let i = 0; i < value.length; i++) {
        if (i === 0 && isNaN(value.charAt(i))) {
            formattedValue += value.charAt(i);
        } else if (i === 1 || i === 2 || i === 3) {
            if (!isNaN(value.charAt(i))) {
                formattedValue += value.charAt(i);
            }
        } else if (i === 4 || i === 5) {
            if (isNaN(value.charAt(i))) {
                formattedValue += value.charAt(i);
            }
        }
    }
    gosNumberInput.value = formattedValue;
});

dateInput.addEventListener("input", () => {
    let value = dateInput.value;
    value = value.replace(/[^\d]/g, "");
    const day = value.substring(0, 2);
    const month = value.substring(2, 4);
    const year = value.substring(4, 8);
    let formattedValue = "";

    if (day && parseInt(day) < 32) {
        formattedValue += day;
        if (day.length >= 2) {
            formattedValue += ".";
        }
    }
    if (month && parseInt(month) < 13) {
        formattedValue += month;
        if (month.length >= 2) {
            formattedValue += ".";
        }
    }
    if (year && parseInt(year) < 2100) {
        formattedValue += year;
    }
    dateInput.value = formattedValue;
});

passSeriesInput.addEventListener("input", () =>{
    let value = passSeriesInput.value.replace(/[^\d]/g, "");
    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    passSeriesInput.value = value;
});

passNumInput.addEventListener("input", () =>{
    let value = passNumInput.value.replace(/[^\d]/g, "");
    if (value.length > 6) {
        value = value.substring(0, 6);
    }
    passNumInput.value = value;
});
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let allFilled = true;
    let formData = {};

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            allFilled = false;
            break;
        }
        let inputName = inputs[i].name;
        let inputValue = inputs[i].value;

        if (!formData[inputName]) {
            formData[inputName] = {};
        }
        formData[inputName].value = inputValue;
        formData[inputName].label = inputs[i].placeholder;
    }

    if (gosNumberInput.value.length !== 6) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Гос-номер"');
    }

    if (dateInput.value.length !== 10) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Ориентировочная дата прибытия к покупателю"');
    }

    if (passSeriesInput.value.length !== 4) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Серия"');
    }

    if (passNumInput.value.length !== 6) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Номер"');
    }

    if (allFilled) {
        alert("Все поля заполнены правильно");
        console.log(formData);
    } else {
        alert("Одно или несколько полей не заполнены или заполнены неправильно");
    }
});