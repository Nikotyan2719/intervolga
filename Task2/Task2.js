let modal = document.getElementById("myModal");
let btn = document.getElementById("openBtn");
let closeButtons = document.getElementsByClassName("closeModal");
let gosNumber = document.getElementById("gosNumber");
let date = document.getElementById("date")
let passSeries = document.getElementById("passSeries")
let passNum = document.getElementById("passNum")
let submit = document.getElementById("submitBtn");
let inputs = document.querySelectorAll("input[type='text']");

btn.onclick = () =>{
    modal.style.display = "block"
}
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = () => {
        modal.style.display = "none";
    }
}
window.onclick = (event) =>{
    if (event.target === modal){
        modal.style.display = "none"
    }
}

inputs.forEach(input => {
    input.addEventListener("input", ()=>{
        localStorage.setItem(input.id, input.value);
    })
    if (localStorage.getItem(input.id)) {
        input.value = localStorage.getItem(input.id);
    }
})

gosNumber.addEventListener("input",  () =>{
    let value = gosNumber.value;
    value = value.toUpperCase();
    let formattedValue = "";

    value = value.replace(/[^А-Я0-9]/g, "");

    if (value.length > 6) {
        value = value.substring(0, 6);
    }


    if (value.length >= 1 && isNaN(value.charAt(0))) {
        formattedValue += value.charAt(0);
    }
    if (value.length >= 2 && !isNaN(value.charAt(1))) {
        formattedValue += value.charAt(1);
    }
    if (value.length >= 3 && !isNaN(value.charAt(2))) {
        formattedValue += value.charAt(2);
    }
    if (value.length >= 4 && !isNaN(value.charAt(3))) {
        formattedValue += value.charAt(3);
    }
    if (value.length >= 5 && isNaN(value.charAt(4))) {
        formattedValue += value.charAt(4);
    }
    if (value.length >= 6 && isNaN(value.charAt(5))) {
        formattedValue += value.charAt(5);
    }

    gosNumber.value = formattedValue;
});

date.addEventListener("input", () => {
    let value = date.value;

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
    date.value = formattedValue;
});

passSeries.addEventListener("input", () =>{
    let value = passSeries.value;
    value = value.replace(/[^\d]/g, "");

    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    passSeries.value = value;
});

passNum.addEventListener("input", () =>{
    let value = passNum.value;
    value = value.replace(/[^\d]/g, "");

    if (value.length > 6) {
        value = value.substring(0, 6);
    }

    passNum.value = value;
});
submit.addEventListener('click', (event) => {
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

    if (gosNumber.value.length !== 6) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Гос-номер"');
    }

    if (date.value.length !== 10) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Ориентировочная дата прибытия к покупателю"');
    }

    if (passSeries.value.length !== 4) {
        allFilled = false;
        alert('Неправильное количество символов в поле "Серия"');
    }

    if (passNum.value.length !== 6) {
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