function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
//Slider NEW VERSIOn

const slides = document.querySelectorAll(slide);
const prev = document.querySelector(prevArrow);
const next = document.querySelector(nextArrow);
const totalSlidesNumber = document.querySelector(totalCounter);
const currentSlidesNumber = document.querySelector(currentCounter);
const slidesWrapper = document.querySelector(wrapper);
const slidesField = document.querySelector(field);
const width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let slideOffset = 0;

recognizeTotalSlides();

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (slideOffset == getNumValue(width) * (slides.length - 1)) {
        slideOffset = 0;
    } else {
        slideOffset += getNumValue(width);
    }

    slidesField.style.transform = `translateX(-${slideOffset}px)`;

    slideIndex == slides.length ? slideIndex = 1 : slideIndex++;
    slides.length < 10 ? currentSlidesNumber.textContent = `0${slideIndex}` : 
            currentSlidesNumber.textContent = slideIndex;

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if (slideOffset == 0) {
        slideOffset = getNumValue(width) * (slides.length - 1)
    } else {
        slideOffset -= getNumValue(width);
    }

    slidesField.style.transform = `translateX(-${slideOffset}px)`;

    slideIndex == 1 ? slideIndex = slides.length : slideIndex--;
    slides.length < 10 ? currentSlidesNumber.textContent = `0${slideIndex}` : 
            currentSlidesNumber.textContent = slideIndex;

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

function recognizeTotalSlides() {
    if (slides.length < 10) {
        totalSlidesNumber.textContent = `0${slides.length}`;
        currentSlidesNumber.textContent = `0${slideIndex}`;
    } else {
         totalSlidesNumber.textContent = slides.length;
         currentSlidesNumber.textContent = slideIndex;
    }
}

// SLIDER (old version)
// showSlides(slideIndex);

// recognizeTotalSlides();

// function showSlides(index) {
//     if (index > slides.length) { slideIndex = 1; }
//     if (index < 1) { slideIndex = slides.length; }

//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';

//     changeCurrentSlide();
// }

// function changeSlide(index) {
//     showSlides(slideIndex += index);
// }

// function changeCurrentSlide() {
//     if (slides.length < 10) {
//         currentSlidesNumber.textContent = `0${slideIndex}`;
//     } else {
//          currentSlidesNumber.textContent = slides.index;
//     }
// }

// prev.addEventListener('click', () => {
//     changeSlide(-1);
// });

// next.addEventListener('click', () => {
//     changeSlide(1);
// });


//DOTS FOR SLIDER

const slider = document.querySelector(container);
const indicators = document.createElement('ol');
const dots = [];


slider.style.position = 'relative';
indicators.classList.add('carousel-indicators');

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    indicators.append(dot);
    dots.push(dot);
}

dots[0].style.opacity = 1;

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        slideOffset = getNumValue(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${slideOffset}px)`;

        slides.length < 10 ? currentSlidesNumber.textContent = `0${slideIndex}` : 
            currentSlidesNumber.textContent = slideIndex;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
});

function getNumValue(str) {
    return +str.replace(/\D/g, '');
}
}

export default slider;