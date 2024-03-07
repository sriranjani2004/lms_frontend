import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [borrowMessage, setBorrowMessage] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getBooks'); // Replace with your PHP backend endpoint
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleCheckboxChange = (bookId) => {
    const updatedSelectedBooks = [...selectedBooks];

    if (updatedSelectedBooks.includes(bookId)) {
      // Book is already selected, so remove it
      updatedSelectedBooks.splice(updatedSelectedBooks.indexOf(bookId), 1);
    } else {
      // Book is not selected, so add it
      updatedSelectedBooks.push(bookId);
    }

    setSelectedBooks(updatedSelectedBooks);
  };

  const handleBorrowBooks = async () => {
    try {
      // Send a request to your PHP backend to handle the borrow books action
      const response = await axios.post('http://localhost:8000/borrow_books.php', {
        selectedBooks: selectedBooks,
      });

      // Assuming the PHP backend returns a success message
      setBorrowedBooks(response.data.selectedBooks);
      setBorrowMessage(response.data.message);

      // Clear the selected books after displaying the message
      setSelectedBooks([]);
    } catch (error) {
      console.error('Error borrowing books:', error);
    }
  };

  const filteredData = books.filter((book) => {
    if (filterOption === '') {
      return true;
    } else {
      const filterValue =
        filterOption === 'year' ? String(book[filterOption]) : book[filterOption];

      return filterValue.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className='table'>
      <h2>Book List</h2>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="">Filter by...</option>
          <option value="bookName">Book Name</option>
          <option value="authorName">Author</option>
          <option value="year">Year</option>
          <option value="subject">Subject</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Year</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((book, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.id)}
                  onChange={() => handleCheckboxChange(book.id)}
                />
              </td>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.year}</td>
              <td>{book.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={handleBorrowBooks}>Borrow Selected Books</button>
        <p>{borrowMessage}</p>
        <p>Borrowed Books: {borrowedBooks.join(', ')}</p>
      </div>
    </div>
  );
};

export default BookList;
