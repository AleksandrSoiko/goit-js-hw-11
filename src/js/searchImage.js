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
    searchImage.searchQuery === refs.input.value.trim() &&
    refs.gallery.children.length !== 0
  ) {
    messageAPI.scrollDown();
    return;
  }
  getImage();
});

async function getImage() {
  searchImage.searchQuery = refs.input.value.trim();
  await searchImage
    .fetchImage()
    .then(response => {
      console.log(response.data.totalHits);
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
          console.log(response);
          const result = response.data.hits;
          const contentMarkup = markup(result);
          refs.gallery.insertAdjacentHTML('beforeend', contentMarkup);
          lightBox.reCreate();

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

// не 500 рисует а 520??????
