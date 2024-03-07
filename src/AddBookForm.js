// AddBookForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    bookName: '',
    authorName: '',
    year: '',
    subject: ''
  });

  const [errors, setErrors] = useState({
    bookName: '',
    authorName: '',
    year: '',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear previous errors for the field

    if (name === 'year' && /^\d{4}$/.test(value)) {
      const currentYear = new Date().getFullYear();
      const enteredYear = parseInt(value, 10);

      if (enteredYear > currentYear) {
        setErrors({ ...errors, [name]: 'Please enter a past or current year.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!bookData.bookName.trim()) {
      formIsValid = false;
      newErrors.bookName = 'Please enter Book Name.';
    }

    if (!bookData.authorName.trim()) {
      formIsValid = false;
      newErrors.authorName = 'Please enter Author Name.';
    }

    if (!bookData.year.trim() || !/^\d{4}$/.test(bookData.year)) {
      formIsValid = false;
      newErrors.year = 'Please enter a valid 4-digit year.';
    } else {
      const currentYear = new Date().getFullYear();
      const enteredYear = parseInt(bookData.year, 10);
      if (enteredYear > currentYear) {
        formIsValid = false;
        newErrors.year = 'Please enter a past or current year.';
      }
    }

    if (!bookData.subject.trim()) {
      formIsValid = false;
      newErrors.subject = 'Please enter Subject.';
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    // If form is valid, proceed with submitting the data
    try {
      await axios.post('https://lms-backend-ytii.onrender.com/addBook', bookData);
      console.log('Book added successfully!');
      setBookData({
        bookName: '',
        authorName: '',
        year: '',
        subject: ''
      });
      setErrors({
        bookName: '',
        authorName: '',
        year: '',
        subject: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <h3>Bookname :</h3>
        </label>
        <input
          type="text"
          name="bookName"
          placeholder="Enter Book Name"
          value={bookData.bookName}
          onChange={handleChange}
        />
        <div className="error">{errors.bookName}</div>

        <label>
          <h3>Authorname:</h3>
        </label>
        <input
          type="text"
          name="authorName"
          placeholder="Enter Author Name"
          value={bookData.authorName}
          onChange={handleChange}
        />
        <div className="error">{errors.authorName}</div>

        <label>
          <h3>Year:</h3>
        </label>
        <input
          type="text"
          name="year"
          placeholder="Enter Year"
          value={bookData.year}
          onChange={handleChange}
        />
        <div className="error">{errors.year}</div>

        <label>
          <h3>Subject:</h3>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          value={bookData.subject}
          onChange={handleChange}
        />
        <div className="error">{errors.subject}</div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
