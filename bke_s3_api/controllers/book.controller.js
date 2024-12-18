import bookModel from "../models/book.model.js";
import userModel from "../models/user.model.js";

// SAVE BOOK
export const saveBook = async (req, res) => {
  const newBook = new bookModel({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    owner: req.user.id,
    pubYear: req.body.pubYear,
  });
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
    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (updatedBook) {
      console.log("true");
      res.status(200).json({
        status: "success",
        message: "The book is updated!!",
        data: { updatedBook },
      });
    } else {
      console.log("false");
      res.status(200).json({
        status: "info",
        message: "This book is not yours.So You can't update it!!",
      });
    }
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
    const deletedBook = await bookModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (deletedBook) {
      console.log("true");
      res.status(200).json({
        status: "success",
        message: "The book is deleted!!",
        data: { deletedBook },
      });
    } else {
      console.log("false");
      res.status(200).json({
        status: "info",
        message: "This book is not yours.So You can't delete it!!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// FIND BOOK
export const findBook = async (req, res) => {
  const qFavorite = req.query.favorite;
  try {
    let books;

    if (qFavorite) {
      const favUser = await userModel.findById(req.user.id);
      const bookFav = await bookModel.findById(qFavorite);
      books = await userModel.aggregate([
        { $match: { _id: favUser._id } },
        {
          $lookup: {
            from: "books",
            localField: "myFavorite",
            foreignField: "_id",
            pipeline: [{ $match: { _id: bookFav._id } }],
            as: "hereIsYourBook",
          },
        },
      ]);

      res.status(200).json({
        status: "success",
        data: { hereIsYourBookFromYourFav: books[0].hereIsYourBook },
      });
    } else {
      books = await bookModel.find();

      res.status(200).json({
        status: "success",
        data: { hereIsYourBookFromAllBook: books },
      });
    }
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
  let books;
  try {
    const favUser = await userModel.findById(req.user.id);

    books = await userModel.aggregate([
      { $match: { _id: favUser._id } },
      {
        $lookup: {
          from: "books",
          localField: "myFavorite",
          foreignField: "_id",
          pipeline: [{ $sample: { size: 2 } }],
          as: "recommendation",
        },
      },
    ]);

    if (books[0].recommendation[0]) {
      console.log(true);
      res.status(200).json({
        status: "success",
        data: { recommendationFromYourFav: books[0].recommendation },
      });
    } else {
      books = await bookModel.aggregate([{ $sample: { size: 1 } }]);
      res.status(200).json({
        status: "success",
        data: { recommendationFromAllBook: books },
      });
    }
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
    const favBook = await bookModel.findById(req.params.id);

    const favUser = await userModel
      .findById(req.user.id)
      .where({ myFavorite: favBook._id });

    if (favUser) {
      const favBookUnCheked = await userModel.findByIdAndUpdate(
        req.user.id,
        { $pull: { myFavorite: favBook._id } },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        message: "Removed from your favorite!!",
        data: { favBookUnCheked },
      });
    } else {
      const favBookCheked = await userModel.findByIdAndUpdate(
        req.user.id,
        { $push: { myFavorite: favBook._id } },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        message: "Added to your favorite!!",
        data: { favBookCheked },
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
    status: "Info",
    messageAdmin: {
      AdminPassword: { username: "code", password: "code" },
    },
    message0: `You have to use Postman or similar app like it.`,
    message1: {
      API: `/api/auth/register --- TO REGISTER USER.`,
      ROUTE_METHOD: "POST",
      BODY: { username: "zeki", password: "123" },
    },
    message2: {
      API: `/api/auth/login --- TO LOGIN USER.`,
      ROUTE_METHOD: "POST",
      BODY: { username: "zeki", password: "123" },
      TOKEN: `In response you get accessToken. copy the string`,
      HEADER: `In the header of any routes that i mention below put the token by giving a name 'token' and paste the string you copied`,
    },
    message3: {
      API: `/api/books/all --- TO GET ALL BOOKS.`,
      ROUTE_METHOD: "GET",
      USAGE: "This route is only for admin",
    },
    message4: {
      API: `/api/books/67428b3b402ec7a16d62eb65 --- TO UPDATE BOOK.`,
      ROUTE_METHOD: "PUT",
      USAGE: "You can update only the book that you created",
    },
    message5: {
      API: `/api/books/67428b3b402ec7a16d62eb65 --- TO DELETE BOOK.`,
      ROUTE_METHOD: "DELETE",
      USAGE: "You can delete only the book that you created",
    },
    message6: {
      API: `/api/books/ --- TO FIND A BOOK.`,
      ROUTE_METHOD: "GET",
      USAGE: {
        query:
          "You can find the book by querying with '/api/books?favorite=67428b3b402ec7a16d62eb65'",
        withOutQuery: "You can find all the book by '/api/books/'",
      },
    },
    message7: {
      API: `/api/books/recommendation --- GIVES YOU 2 RECOMMENDED BOOKS FROM YOU FAVORITE BOOKS.`,
      ROUTE_METHOD: "GET",
      USAGE: "Gives you two maximam or one if you only have one favorite book",
    },
    message8: {
      API: `/api/books/favorite/67428afb402ec7a16d62eb5c --- MAKE A BOOK FAVORITE OR REMOVE FROM FAVORITE.`,
      ROUTE_METHOD: "GET",
      USAGE: "It used as togle between 'favorite' or 'not favorite'",
    },
    message9: {
      API: `/api/books/ ------ TO CREATE BOOK `,
      ROUTE_METHOD: "POST",
      USAGE: "All users can create a book which they are the owner of it",
    },
  });
};
