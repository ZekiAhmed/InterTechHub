# Project Title

This api is stage-2 project. this api is a simple book collection for CRUD books from database.
Here it is (https://backend-s2.onrender.com/)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

## Prerequisites

What things you need to install the software

- install postman (https://www.postman.com/downloads/)

## Installing

A step by step guide that tell you how to get a development env running

- Clone this repository (https://github.com/ZekiAhmed/InterTechHub.git) or download the zipfile (https://github.com/ZekiAhmed/InterTechHub/archive/refs/heads/main.zip).

- Change directory to pke_s2_api

- Run 'npm install' to install all dependencies

- Run 'npm run dev' now the api's are live!!

- Then go to postman and create new request

- Put 'localhost:3000/api/books/' and click send you get
  all the books in the database

## How To Use The Api

- localhost:3000/api/books/ ------ TO SAVE BOOK -- WORKS ONLY ON POSTMAN
- localhost:3000/api/books/67428b3b402ec7a16d62eb65 --- TO UPDATE BOOK -- WORKS ONLY ON POSTMAN
- localhost:3000/api/books/67428b3b402ec7a16d62eb65 --- TO DELETE BOOK -- WORKS ON WEB
- localhost:3000/api/books/find/67428ae1402ec7a16d62eb5a --- TO FIND A BOOK -- WORKS ON WEB
- localhost:3000/api/books/ --- TO FIND ALL BOOKS -- WORKS ON WEB
- localhost:3000/api/books/recommendation --- GIVES YOU 2 RECOMMENDED BOOKS -- WORKS ON WEB
- localhost:3000/api/books/favorite/67428afb402ec7a16d62eb5c --- MAKE A BOOK FAVORITE -- WORKS ON WEB
