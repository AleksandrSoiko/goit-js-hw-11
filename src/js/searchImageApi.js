const axios = require('axios').default;
const KEY = '32806181-ed8f0bef33945c9ae716ebd1a';
const BASE_URL = 'pixabay.com/api';

export default class searchImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lastPage = 1;
  }

  async fetchImage() {
    return await axios.get(
      `https://${BASE_URL}/?key=${KEY}&q=${this.searchQuery.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`,
      { credentials: 'omit' }
    );
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  resetLastPage() {
    this.lastPage = 1;
  }
  resetSearchQuery() {
    this.searchQuery = '';
  }
}
