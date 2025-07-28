const User = require('../models/User');

const userController = {
  // Query Resolvers
  users: async () => {
    try {
      return await User.find();
    } catch (err) {
      throw new Error(err);
    }
  },
  
  user: async ({ id }) => {
    try {
      return await User.findById(id);
    } catch (err) {
      throw new Error(err);
    }
  },
  
  // Mutation Resolvers
  createUser: async ({ input }) => {
    try {
      const user = new User(input);
      await user.save();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  updateUser: async ({ id, input }) => {
    try {
      return await User.findByIdAndUpdate(id, input, { new: true });
    } catch (err) {
      throw new Error(err);
    }
  },
  
  deleteUser: async ({ id }) => {
    try {
      return await User.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = userController;