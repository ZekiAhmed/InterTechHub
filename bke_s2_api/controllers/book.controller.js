import bookModel from "../models/book.model.js";

// SAVE BOOK
export const saveBook = async (req, res) => {
  const newBook = new bookModel(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json({
      status: "success",
      data: { savedBook },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: { updatedBook },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE BOOK
export const deleteBook = async (req, res) => {
  try {
    await bookModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Book has been deleted...",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// FIND BOOK
export const findBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// FIND ALL BOOK
export const findAllBook = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({
      status: "success",
      data: { books },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SOME BOOK RECOMMENDATION
export const bookRecommendation = async (req, res) => {
  try {
    const books = await bookModel.aggregate([{ $sample: { size: 2 } }]);

    res.status(200).json({
      status: "success",
      data: { books },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// ADD BOOK AS FAVORITE
export const favoriteBook = async (req, res) => {
  try {
    const favBook = await bookModel
      .findById(req.params.id)
      .where({ favorite: true });
    if (favBook) {
      const favBookFalse = await bookModel.findByIdAndUpdate(
        req.params.id,
        { favorite: false },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        data: { favBookFalse },
      });
    } else {
      const favBookTrue = await bookModel.findByIdAndUpdate(
        req.params.id,
        { favorite: true },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        data: { favBookTrue },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const apiUsageGuide = (req, res) => {
  res.status(200).json({
    status: "success",
    message1: `/api/books/ --- TO GET ALL BOOKS -- WORKS ON WEB.`,
    message2: `/api/books/67428b3b402ec7a16d62eb65 --- TO UPDATE BOOK -- WORKS ONLY ON POSTMAN`,
    message3: `/api/books/67428b3b402ec7a16d62eb65 --- TO DELETE BOOK -- WORKS ON WEB`,
    message4: `/api/books/find/67428ae1402ec7a16d62eb5a --- TO FIND A BOOK -- WORKS ON WEB`,
    message5: `/api/books/recommendation --- GIVES YOU 2 RECOMMENDED BOOKS -- WORKS ON WEB`,
    message6: `/api/books/favorite/67428afb402ec7a16d62eb5c --- MAKE A BOOK FAVORITE -- WORKS ON WEB`,
    message7: `/api/books/ ------ TO SAVE BOOK -- WORKS ONLY ON POSTMAN`,
  });
};
