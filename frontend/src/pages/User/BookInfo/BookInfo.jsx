import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BackButtton from '../../../components/BackButton';
import { BookContext } from '../../../provider/BookContext';

const BookInfo = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const book = books.find((book) => book._id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  const { title, author, publishYear, image, tag, price } = book;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={image} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-8">Book</h1>

              <BackButtton isAdmin={false} />
            </div>

            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Title</th>
                  <th className="border border-slate-500 rounded-md">Author</th>
                  <th className="border border-slate-500 rounded-md">
                    Publish Year
                  </th>
                  <th className="border border-slate-500 rounded-md">
                    Price ($)
                  </th>
                  <th className="border border-slate-500 rounded-md">Tags</th>
                </tr>
              </thead>

              <tbody>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <td className="text-center">{title}</td>
                </div>

                <td className="text-center">{author}</td>
                <td className="text-center">{publishYear}</td>
                <td className="text-center">{price}</td>
                <td className="text-center">{tag}</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
