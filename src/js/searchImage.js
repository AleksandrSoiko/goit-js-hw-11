import searchImageApi from './searchImageApi';
import markup from './markupService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const searchImage = new searchImageApi();
const refs = {
  input: document.querySelector('.js-input'),
  button: document.querySelector('.js-btn'),
  gallery: document.querySelector('.gallery'),
};

async function getImage() {
  const answer = await searchImage.fetchImage().then(response => {
    return response;
  });
  const data = await answer.data.hits;
  return data;
}

refs.button.addEventListener('click', async event => {
  event.preventDefault();
  searchImage.searchQuery = refs.input.value;
  refs.gallery.innerHTML = ' ';
  await getImage().then(async data => {
    const result = await markup(data);

    await refs.gallery.insertAdjacentHTML('beforeend', result);

    const lightbox = await new SimpleLightbox('.gallery a', {
      scrollZoom: false,
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
  });
});
