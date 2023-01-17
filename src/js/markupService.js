export default function markup(array) {
  const contentMarkup = array
    .map(
      element => `
      <a href="${element.largeImageURL}">
        <div class="photo-card">
            <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
             <div class="info">
                 <p class="info-item">
                    <b>
                       <span>
                         Likes
                       </span>
                        ${element.likes}
                    </b>
                </p>
                <p class="info-item">
                    <b>
                        <span>
                          Views
                        </span>
                        ${element.views}
                    </b>
                </p>
                <p class="info-item">
                    <b>
                        <span>
                          Comments
                        </span>
                        ${element.comments}
                    </b>
                </p>
                <p class="info-item">
                    <b><span>Downloads</span> ${element.downloads}</b>
                </p>
            </div>
        </div>
     </a>
    `
    )
    .join('');
  return contentMarkup;
}
