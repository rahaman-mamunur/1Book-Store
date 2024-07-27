import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosPublic from '../components/AxiosPublic';
import BackButtton from '../components/BackButton';
import Spinner from '../components/Spinner';
import useAxiosSecure from '../hook/useTokenSecure';
import { BookContext } from '../provider/BookContext';

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { refetch } = useContext(BookContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/books/${id}`)
      .then((res) => {
        setLoading(false);
        setAuthor(res.data.data.author);
        setTitle(res.data.data.title);
        setPublishYear(res.data.data.publishYear);
        setTag(res.data.data.tag);
        setImage(res.data.data.image);
        setPrice(res.data.data.price);
        // refetch();
      })
      .catch((error) => console.log(error));
  }, [id, refetch]);

  const handleImage = async (e) => {
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imgFile);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      setImage(res.data.data.display_url);
      console.log(res.data.data.display_url);

      console.log(res.data);
      console.log('image', image);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerUpdate = async (e) => {
    e.preventDefault();

    const bookInfo = {
      title,
      author,
      publishYear,
      image,
      tag,
      price,
    };

    setLoading(true);
    const res = await axiosSecure.patch(`/books/${id}`, bookInfo);
    setLoading(false);
    console.log(res.data.data);
    refetch();
    navigate('/admin/dashboard');
  };

  return (
    <>
      <div className="p-4">
        <BackButtton isAdmin={true} />
        <h1 className="text-3xl my-4">Edit Book</h1>
        {loading ? <Spinner /> : ''}
        <form className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div>
            <input
              type="file"
              onChange={handleImage}
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handlerUpdate}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBooks;
