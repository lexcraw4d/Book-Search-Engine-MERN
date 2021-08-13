// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
 
  type Book {
    id: String
    author: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  
type Query {
    me: [User]
  }`;

// export the typeDefs
module.exports = typeDefs;