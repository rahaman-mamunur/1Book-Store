import { useContext, useState } from 'react';
import { BookContext } from '../../../provider/BookContext';
import BookCard from './BookCard';

const Tags = () => {
  const { books } = useContext(BookContext);

  const [filteredBooks, setfilteredBooks] = useState([]);
  const uniqueTags = books ? [...new Set(books.map((item) => item.tag))] : [];

  const handleTagButton = (tag) => {
    const filteredBooks = books.filter((item) => item.tag === tag);
    setfilteredBooks(filteredBooks);
  };

  const handleShowAllBooks = () => {
    setfilteredBooks([]);
  };

  return (
    <>
      <button
        className="btn btn-outline btn-accent capitalize mb-10"
        onClick={handleShowAllBooks}
      >
        Show All Books
      </button>

      <div className="flex flex-wrap gap-2 justify-between">
        {uniqueTags.map((tag, index) => (
          <button
            key={index}
            className="btn btn-outline btn-accent capitalize"
            onClick={() => handleTagButton(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
        {(filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
          <BookCard key={book._id} item={book} />
        ))}
      </div>
    </>
  );
};
export default Tags;
