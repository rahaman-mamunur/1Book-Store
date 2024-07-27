import { createContext, useEffect, useState } from 'react';
import axiosPublic from '../components/AxiosPublic';

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get('/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const refetch = () => {
    setLoading(true);
    axiosPublic
      .get('/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const bookInfo = {
    books,
    loading,
    refetch,
  };
  return (
    <>
      <BookContext.Provider value={bookInfo}>{children}</BookContext.Provider>
    </>
  );
};
export default BookProvider;
