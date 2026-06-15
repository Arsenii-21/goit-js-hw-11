import axios from 'axios';

const API_KEY = '56320794-31c479758a0ddef69c373babb'; 

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 10000,
});

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  const response = await api.get('/', { params });
  // axios response body is in response.data
  return response.data;
}
