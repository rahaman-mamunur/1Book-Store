import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://1book-store.vercel.app',
});

export default axiosPublic;
