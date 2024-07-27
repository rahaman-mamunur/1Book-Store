import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButtton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [showBook, setShowBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://1book-store.vercel.app/books/${id}`)
      .then((res) => {
        setShowBook(res.data.data);
        console.log('here is the boo ', res.data);
        console.log('okkkkkkkkkkkkk');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log('okkkkkk');

  return (
    <div className="p-4">
      <BackButtton isAdmin={true} />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{showBook._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 ">Title</span>
            <span>{showBook.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{showBook.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{showBook.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price</span>
            <span>{showBook.price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Tag</span>
            <span>{showBook.publishYear}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShowBook;
