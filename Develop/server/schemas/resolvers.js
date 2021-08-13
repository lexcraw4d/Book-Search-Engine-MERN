const { User, Book } = require('../models')
  const resolvers ={ 
    
        Query: {
          me: async () => {
            return User.find()
          }
        }
     
  }
  module.exports = resolvers;