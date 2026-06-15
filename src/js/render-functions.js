import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightboxInstance = null;

function ensureLightbox() {
  if (!lightboxInstance) {
    lightboxInstance = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function createGallery(images) {
  const container = document.querySelector('.gallery');
  if (!container) return;

  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="gallery-info">
        <p class="gallery-stat"><span>Likes:</span> ${img.likes}</p>
        <p class="gallery-stat"><span>Views:</span> ${img.views}</p>
        <p class="gallery-stat"><span>Comments:</span> ${img.comments}</p>
        <p class="gallery-stat"><span>Downloads:</span> ${img.downloads}</p>
      </div>
    </li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
  ensureLightbox();
  if (lightboxInstance && typeof lightboxInstance.refresh === 'function') {
    lightboxInstance.refresh();
  }
}

export function clearGallery() {
  const container = document.querySelector('.gallery');
  if (container) container.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('is-visible');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('is-visible');
}
