print('==> Seeding database...');

const dbName = 'hello_nest';
const targetDb = db.getSiblingDB(dbName);

// (opzionale) crea collezione e indice unique
targetDb.createCollection('books');
targetDb.createCollection('sales');

// Import JSON da file montato in /seed
const booksJson = cat('/seed/books.json');
const books = JSON.parse(booksJson);

// Inserimento
targetDb.users.insertMany(books);

print('==> Seed completed. Inserted users: ' + books.length);
