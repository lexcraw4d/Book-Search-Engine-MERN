// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
input bookData {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String
}
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!, _id: ID!) : User
  }


  type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: bookData): User
        removeBook(bookId: String!): User
    }
`;
// export the typeDefs
module.exports = typeDefs;
