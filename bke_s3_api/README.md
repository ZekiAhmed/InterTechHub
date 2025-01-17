# Project Title

This api is a stage-3 project. It has Advanced API with Authentication and Role-Based Access Control (RBAC).
Here it is (https://backend-s3.onrender.com/)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

## Prerequisites

What things you need to install the software

- install postman (https://www.postman.com/downloads/)

## Installing and Setting up development env

A step by step guide that tell you how to get a development env running

- Clone this repository (https://github.com/ZekiAhmed/InterTechHub.git) or download the zipfile (https://github.com/ZekiAhmed/InterTechHub/archive/refs/heads/main.zip).

- Change directory to bke_s3_api

- Run 'npm install' to install all dependencies

- Run 'npm run dev' now the api's are live!!

- Then go to postman and create request like below

## How To Use The Api

- message0: `You have to use Postman or similar app like it.`,

- [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.postman.co/run-collection/36777704-b91c866b-dc08-4c7c-832f-d085f51d7f1b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D36777704-b91c866b-dc08-4c7c-832f-d085f51d7f1b%26entityType%3Dcollection%26workspaceId%3Dcc814962-3c92-4ff5-810c-59ec9126a9ae)

- messageAdmin: {
  AdminPassword: { username: "code", password: "code" },
  },

- message1: {
  API: `/api/auth/register --- TO REGISTER USER.`,
  ROUTE_METHOD: "POST",
  BODY: { username: "zeki", password: "123" },
  },

- message2: {
  API: `/api/auth/login --- TO LOGIN USER.`,
  ROUTE_METHOD: "POST",
  BODY: { username: "zeki", password: "123" },
  TOKEN: `In response you get accessToken. copy the string`,
  HEADER: `In the header of any routes that i mention below put the token by giving a name 'token' and paste the string you copied`,
  },

- message3: {
  API: `/api/books/all --- TO GET ALL BOOKS.`,
  ROUTE_METHOD: "GET",
  USAGE: "This route is only for admin",
  },

- message4: {
  API: `/api/books/67428b3b402ec7a16d62eb65 --- TO UPDATE BOOK.`,
  ROUTE_METHOD: "PUT",
  USAGE: "You can update only the book that you created",
  },

- message5: {
  API: `/api/books/67428b3b402ec7a16d62eb65 --- TO DELETE BOOK.`,
  ROUTE_METHOD: "DELETE",
  USAGE: "You can delete only the book that you created",
  },

- message6: {
  API: `/api/books/ --- TO FIND A BOOK.`,
  ROUTE_METHOD: "GET",
  USAGE: {
  query:
  "You can find the book by querying with `/api/books?favorite=67428b3b402ec7a16d62eb65`",
  withOutQuery: "You can find all the book by `/api/books/`",
  },
  },

- message7: {
  API: `/api/books/recommendation --- GIVES YOU 2 RECOMMENDED BOOKS FROM YOU FAVORITE BOOKS.`,
  ROUTE_METHOD: "GET",
  USAGE: "Gives you two maximam or one if you only have one favorite book",
  },

- message8: {
  API: `/api/books/favorite/67428afb402ec7a16d62eb5c --- MAKE A BOOK FAVORITE OR REMOVE FROM FAVORITE.`,
  ROUTE_METHOD: "GET",
  USAGE: "It used as toggle between 'favorite' or 'not favorite'",
  },

- message9: {
  API: `/api/books/ ------ TO CREATE BOOK `,
  ROUTE_METHOD: "POST",
  USAGE: "All users can create a book which they are the owner of it",
  },
