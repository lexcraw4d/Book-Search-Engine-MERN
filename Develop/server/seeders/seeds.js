const faker = require('faker');

const db = require('../config/connection');
const { Book, User } = require('../models');
console.log('Book', Book);


db.once('open', async () => {
  await Book.Book.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName()
    const email = faker.internet.email()
    const id = faker.datatype.number({'min': 5, 'max':15 })
    console.log('id', id);
    const bookCount = faker.finance.routingNumber()
    console.log('bookCount', bookCount);
    userData.push({ username, email, id, bookCount});
  }

  const createdUsers = await User.collection.insertMany(userData);
  // create user data
  const bookData = [];

  for (let i = 0; i < 10; i += 1) {
    const author = faker.name.findName();
    const description = faker.commerce.productDescription();
    const id = faker.lorem.word();
    const image = faker.lorem.word()
    const link = faker.lorem.word()
    const title = faker.commerce.productName()
    bookData.push({ author, description, id, image, link, title});
  }

  const createdBooks = await Book.Book.collection.insertMany(bookData);


  // create savedbook
  for (let i = 0; i < 5; i += 1) {
    const savedBooks = faker.commerce.productName(Math.round(Math.random() * 20) + 1);


    await User.updateOne(
      { $push: { savedBooks: savedBooks } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
