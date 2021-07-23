import {getResources} from '../services/services';

function cards() {
  class MenuCard {
    constructor(srcImage, altImage, title, description, price, parentSelector, ...classes) {
        this.srcImage = srcImage;
        this.altimage = altImage;
        this.title = title;
        this.description = description;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 73;
        this.changeToRUB();
    }

    changeToRUB() {
        this.price = +this.price * this.transfer;
    }

    render() {
        const card = document.createElement('div');
        if (this.classes.length === 0) {
            card.classList.add('menu__item');
        } else {
            this.classes.forEach(className => card.classList.add(className));
        }
        
        card.innerHTML = `
            <img src=${this.srcImage} alt=${this.altimage}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        `;
        this.parent.append(card);    
    }
}

getResources('http://localhost:3000/menu')
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price,".menu .container",'menu__item','big',).render();
    });
});

//вместо прописывания своих функций, ручного рендера каждой карты, можно воспользоваться axios
// axios.get('http://localhost:3000/menu')
// .then(resp => {
//     resp.data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price,".menu .container",'menu__item','big',).render();
//     });
// });
}

export default cards;