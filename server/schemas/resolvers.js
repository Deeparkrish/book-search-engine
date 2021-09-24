const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers ={
    Query :{
        me: async (parent, args) => {
            const userData = await User.findOne({})
              .select('-__v -password')
              .populate('savedBooks');

              return userData;

          },
        
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
     



    }
}

module.exports =resolvers;