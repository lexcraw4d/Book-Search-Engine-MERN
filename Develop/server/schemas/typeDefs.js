// import the gql tagged template function
const { gql } = require("apollo-server-express");

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

  input BookInputData {
    author: [String]
    description: String
    bookId: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInputData): User
  }
`;
// export the typeDefs
module.exports = typeDefs;
