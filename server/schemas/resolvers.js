const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers ={
    Query :{
        me: async (parent, args,context) => {
            if(context.user){
            const userData = await User.findOne({})
              .select('-__v -password')
              .populate('savedBooks');

              return userData;

          }
          throw new AuthenticationError('Not logged in');

        }
        
    },
    Mutation:{
        addUser :async(parent,args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            return {user,token};
        },
        login :async(parent, {email,password})=>{
            const user =await User.findOne({email})
            if(!user){
                throw new AuthenticationError('Invalid credentials')
            }
            const pwd = await user.isCorrectPassword(password);
            if(!pwd){
            throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user);
            return {user,token};
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
              const userData = await Thought.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
              return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
              console.log(context.user);
              const userData = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
              return userData;
            }
      
            throw new AuthenticationError("You need to be logged in!");
          },    


     



    }
}

module.exports =resolvers;