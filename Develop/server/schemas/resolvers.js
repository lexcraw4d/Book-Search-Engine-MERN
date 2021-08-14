const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth")
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if (!User){
        throw new AuthenticationError ('Incorrect credentials!')
      }
      const correctPW = await user.isCorrectPassword(password)

      if(!correctPW) {
        throw new AuthenticationError ('Incorrect credentials!')
      }
      const token = signToken (user)
      return {token, user}

    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }

    },
}
}
module.exports = resolvers;
