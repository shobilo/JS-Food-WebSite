require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import calc from './modules/calc';
import modalOffer from './modules/modalOffer';
import cards from './modules/cards';
import slider from './modules/slider';
import forms from './modules/forms';
import {openModalWindow} from './modules/modalOffer';


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 10000);
    const timerDeadline = '2021-07-20';

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', timerDeadline);
    calc();
    modalOffer('[data-modal]', '.modal', modalTimerId);
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms('form', modalTimerId);

});
