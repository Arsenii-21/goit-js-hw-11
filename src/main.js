import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form ? form.querySelector('input[name="search-text"]') : null;

if (form && input) {
	form.addEventListener('submit', async e => {
		e.preventDefault();
		const query = input.value.trim();

		if (!query) {
			iziToast.error({
				title: 'Error',
				message: 'Please enter a search term',
			});
			return;
		}

		clearGallery();
		showLoader();

		try {
			const data = await getImagesByQuery(query);
			hideLoader();

			const images = data.hits || [];
			const total = data.totalHits || 0;

			if (!images.length) {
				iziToast.error({
					title: 'Error',
					message: 'Sorry, there are no images matching your search query. Please try again!',
				});
				return;
			}

			createGallery(images);

			iziToast.success({
				title: 'Success',
				message: `Found ${total} images.`,
			});
		} catch (err) {
			hideLoader();
			iziToast.error({
				title: 'Error',
				message: err.message,
			});
		}
	});
}

