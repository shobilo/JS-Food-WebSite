function openModalWindow(modalSelector, modalTimerId){
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function closeModalWindow(modalSelector){
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'none';
  document.body.style.overflow = '';
}

function modalOffer(triggerSelector, modalSelector, modalTimerId) {
/////////////////modal

const modalButtons = document.querySelectorAll(triggerSelector);
const modalWindow = document.querySelector(modalSelector);

modalButtons.forEach((button) => {
    button.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
});



modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-modal-close') == '') {
        closeModalWindow(modalSelector);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display == "block"){
        closeModalWindow(modalSelector);
    }
});

//////////////////////setTimeout for modal window

function showModalByScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >= 
        (0.9998 * document.documentElement.scrollHeight)){
            console.log("ghe");
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

}

export default modalOffer;
export {openModalWindow};
export {closeModalWindow};