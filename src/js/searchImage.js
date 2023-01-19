import searchImageApi from './searchImageApi';
import markup from './markupService';
import lightBoxAPI from './lightBox';
import notifyMessage from './notifyMessage';

const searchImage = new searchImageApi();
const messageAPI = new notifyMessage();
const lightBox = new lightBoxAPI();

const options = {
  root: null,
  rootMargin: '400px',
  threshold: 0,
};

let observer = new IntersectionObserver(onLoad, options);

const refs = {
  input: document.querySelector('.js-input'),
  button: document.querySelector('.js-btn'),
  gallery: document.querySelector('.gallery'),
  guard: document.querySelector('.js-observer'),
};

refs.button.addEventListener('click', event => {
  event.preventDefault();
  if (
    searchImage.searchQuery.toLowerCase() ===
      refs.input.value.toLowerCase().trim() &&
    refs.gallery.children.length !== 0
  ) {
    messageAPI.scrollDown();
    return;
  }
  searchImage.resetPage();
  getImage();
});

async function getImage() {
  searchImage.searchQuery = refs.input.value.trim();
  await searchImage
    .fetchImage()
    .then(response => {
      if (response.data.hits.length === 0) {
        messageAPI.noImage();
        allReset();
        return;
      }
      if (searchImage.searchQuery.trim() === '') {
        messageAPI.emptyValue();
      }
      searchImage.lastPage = Math.round(response.data.totalHits / 40);
      const result = response.data.hits;
      const contentMarkup = markup(result);
      refs.gallery.innerHTML = ' ';
      refs.gallery.insertAdjacentHTML('beforeend', contentMarkup);
      lightBox.create();
      searchImage.incrementPage();
      observer.observe(refs.guard);
      messageAPI.firstResponse(response.data.totalHits);
    })
    .catch(error => console.log(error));
}

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      searchImage
        .fetchImage()
        .then(response => {
          const result = response.data.hits;
          const contentMarkup = markup(result);
          refs.gallery.insertAdjacentHTML('beforeend', contentMarkup);
          lightBox.reCreate();
          // lightScroll();

          if (searchImage.page === searchImage.lastPage) {
            observer.unobserve(refs.guard);
            allReset();
            messageAPI.lastPage();
            return;
          }

          searchImage.incrementPage();
        })
        .catch(err => console.log(err));
    }
  });
}

function allReset() {
  searchImage.resetLastPage();
  searchImage.resetPage();
  searchImage.resetSearchQuery();
}

// Плавное прокручивание страницы не имеет смысла с использованием
// бесконечного скролла так как к нам приходит ответ в процессе скролла
// а не по клику на кнопку. и не имеет смысла прокручивать страницу
// до новых зарендереных карточек.
// в функционале я зазобрался ( первый метод возвращает отступы и размеры
// обьекта второй прокручивает область просмотра на две высоты карточки)
//

// function lightScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
