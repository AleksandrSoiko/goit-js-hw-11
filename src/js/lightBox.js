import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class lightBoxAPI {
  constructor() {
    this.instance;
  }
  create() {
    this.instance = new SimpleLightbox('.gallery a', {
      scrollZoom: false,
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
    return this.instance;
  }

  reCreate() {
    this.instance.refresh();
  }
}
