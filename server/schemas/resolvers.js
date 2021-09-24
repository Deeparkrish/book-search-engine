const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers ={
    Query :{
        me : async(parent,{username})=>{
            const params = username ?{username}:{};
            return User.find(params).sort({createdAt :-1}).select('-__v -password');
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
        // removeBook :async(parent,{bookId}){
        //     const data = await 

        // }



    }
}

module.exports =resolvers;