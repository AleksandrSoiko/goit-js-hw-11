import { Notify } from 'notiflix';

export default class notifyMessage {
  noImage() {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  emptyValue() {
    Notify.warning('Okay! Random images');
  }
  firstResponse(value) {
    Notify.success(`Hooray! We found ${value} images.`);
  }
  lastPage() {
    Notify.success(
      "We're sorry, but you've reached the end of search results."
    );
  }
  scrollDown() {
    Notify.warning("It's your current search query. Please SCROLL DOWN)))");
  }
}
