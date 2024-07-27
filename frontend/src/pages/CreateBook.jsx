import { useForm } from 'react-hook-form';
import axiosPublic from '../components/AxiosPublic';
import BackButton from '../components/BackButton';

import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hook/useTokenSecure';

const image_host_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

const CreateBooks = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imgFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    console.log(res.data);

    if (res.data.success) {
      const bookInfo = {
        title: data.title,
        author: data.author,
        publishYear: data.publishYear,
        image: res.data.data.display_url,
        tag: data.tag,
        price: parseFloat(data.price),
      };

      const bookRes = await axiosSecure.post('/books', bookInfo);
      navigate('/admin/dashboard');
      console.log(bookRes.data);
    }
  };

  return (
    <>
      <BackButton isAdmin={true} />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6 ">
            <div className="label">
              <span className="label-text">Title*</span>
            </div>
            <input
              type="text"
              placeholder="Title Name"
              {...register('title', { required: true })}
              className="input input-bordered w-full "
            />
          </div>

          <div className="form-control w-full my-6 ">
            <div className="label">
              <span className="label-text">Author*</span>
            </div>
            <input
              type="text"
              placeholder="author"
              {...register('author', { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full my-6 ">
            <div className="label">
              <span className="label-text">Tag*</span>
            </div>
            <input
              type="text"
              placeholder="tag"
              {...register('tag', { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full my-6 ">
            <div className="label">
              <span className="label-text">Publish Year*</span>
            </div>
            <input
              type="number"
              placeholder="Publish Year"
              {...register('publishYear', { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full my-6 ">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              type="number"
              placeholder="Price"
              {...register('price', { required: true })}
              className="input input-bordered w-full "
              step="any"
            />
          </div>
          <div>
            <input
              type="file"
              {...register('image', { required: true })}
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn mt-4">Add Item</button>
        </form>
      </div>
    </>
  );
};

export default CreateBooks;
