function calc() {
//Calculator

const result = document.querySelector('.calculating__result span');
let sex;
let height;
let weight; 
let age;
let ratio;

initCalcSettings('#gender div', 'calculating__choose-item_active');
initCalcSettings('.calculating__choose_big div', 'calculating__choose-item_active');


handleStaticInformation('#gender div', 'calculating__choose-item_active');
handleStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

handleDynamicInformation('#height');
handleDynamicInformation('#weight');
handleDynamicInformation('#age');

calcTotal();

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.round((447.6  + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36  + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

    console.log(result.textContent);
}

function handleStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
        });
    });

}

function handleDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', (e) => {

        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        switch (input.getAttribute('id')) {
            case 'height':
                height = getNumValue(input.value);
                console.log(height);
                break;
            case 'weight':
                weight = getNumValue(input.value);
                break;
            case 'age':
                age = getNumValue(input.value);
                break;
        }

        calcTotal();
    });
}

function initCalcSettings (selector, activeClass) {
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem(`sex`, 'female');
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem(`ratio`, 1.375);
    }

    document.querySelectorAll('.calculating__choose_medium input').forEach(inp => inp.value="");

    const elements = document.querySelectorAll(selector);
    
    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex') || 
            elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });

}
}

export default calc;