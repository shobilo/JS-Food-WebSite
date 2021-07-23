import {closeModalWindow, openModalWindow} from './modalOffer';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
  // FORMS to backend, в слешах старый способ - XMLHTTPRequest

  const forms = document.querySelectorAll(formSelector);
  const message = {
      loading: 'img/form/spinner.svg',
      success: 'Thanks, we will contact you soon.',
      failure: 'Oops! Something went wrong',
  };

  forms.forEach(form => {
      bindPostData(form);
  });

  function bindPostData(form){
      form.addEventListener('submit', (event) => {
          event.preventDefault();

          const statusMessage = document.createElement('img');
          statusMessage.src = message.loading;
          statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend', statusMessage);

          // const request = new XMLHttpRequest();
          // request.open('POST', 'server.php');

          //если используется XMLHttpRequest и FormData, то setRequestHeader устанавливать не нужно!
          // request.setRequestHeader('Content-type', 'multipart/form-data');
          // request.setRequestHeader('Content-type', 'application/json');

          const formData = new FormData(form);

          //если нужен json, то нужно преобразовать formData
          // const jsonObject = {};
          // formData.forEach(function(value, key){
          //     jsonObject[key] = value; 
          // });
          const json = JSON.stringify(Object.fromEntries(formData.entries())); //данные из формы преобразовали в массив массивов, затем в объект, затем в JSON

          // request.send(formData);
          // request.send(json);

          
          // fetch('server.php', {
          //     method: 'POST',
          //     headers: {
          //         'Content-type': 'application/json'
          //     },
          //     body: JSON.stringify(jsonObject)
          // })
          postData('http://localhost:3000/requests', 
              json)
          .then(data => {
              console.log(data);
              showThanksModal(message.success);
              statusMessage.remove();
          }).catch(() => {
              showThanksModal(message.failure);
          }).finally(() => {
              form.reset();
          });

          // request.addEventListener('load', () => {
          //     if (request.status === 200){
          //         // console.log(request.response);
          //         showThanksModal(message.success);
          //         form.reset();

          //         statusMessage.remove();
          //     } else {
          //         showThanksModal(message.failure);
          //     }
          // });
      });
  }

  function showThanksModal(message) {
      const previousModalDialog = document.querySelector('.modal__dialog');

      previousModalDialog.style.display = 'none';
      openModalWindow('.modal', modalTimerId);

      const thanksModalWindow = document.createElement('div');
      thanksModalWindow.classList.add('modal__dialog');
      thanksModalWindow.innerHTML = `
          <div class="modal__content">
              <div data-modal-close class="modal__close">&times</div>
              <div class="modal__title">${message}</div>
          </div> 
      `;

      document.querySelector('.modal').append(thanksModalWindow);
      setTimeout(() => {
          thanksModalWindow.remove();
          previousModalDialog.style.display = 'block';
          closeModalWindow('.modal');
      }, 4000);
  }

  // fetch('http://localhost:3000/menu')
  // .then(data => data.json())
  // .then(res => console.log(res));
}
export default forms;