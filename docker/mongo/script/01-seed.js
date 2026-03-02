const dbName = 'book_store_db';
const targetDb = db.getSiblingDB(dbName);

targetDb.createCollection('books');
targetDb.createCollection('sales');

const booksData = require('/books.json');
const booksJson = JSON.stringify(booksData);
targetDb.books.insertMany(JSON.parse(booksJson));
