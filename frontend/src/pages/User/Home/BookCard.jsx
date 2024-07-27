import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../../../components/AxiosPublic';
import useAuth from '../../../hook/useAuth';
import useCart from '../../../hook/useCart';

const BookCard = ({ item }) => {
  const { title, image, tag, price, _id, author, publishYear } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      // send to db
      const bookItem = {
        bookId: _id,
        title,
        author,
        publishYear,
        email: user.email,
        image,
        tag,
        price,
      };

      axiosPublic
        .post('/carts', bookItem)
        .then((res) => {
          console.log(res.data);

          if (res.data.insertedId) {
            refetch();
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="flex justify-between items-center">
        <figure>
          <img src={image} alt={title} />
        </figure>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{tag}</div>
        </h2>
        <div className="card-actions justify-between">
          <div className="badge badge-outline">$ {price}</div>
          <div className="card-actions">
            <Link to={`/booksinfo/${item._id}`}>
              <button className="btn btn-outline btn-accent">Info</button>
            </Link>

            <button onClick={handleAddToCart} className="btn btn-primary">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
