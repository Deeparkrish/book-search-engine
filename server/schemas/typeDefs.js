// import the gql tagged template 
const {gql} = require('apollo-server-express');

// create type def 
// The Thought data type will be the custom Thought data type.
 // Query will return an array of thoughts 

 //// an Auth type must return a token and can optionally include any other user data.

const typeDefs = gql `
type Author {
    _id: ID
    firstName: String
    lastName: String
    books: [Book]
  }
  type Book {
    _id:ID
    bookId:Int
    description:String
    authors :[Author] 
    title:String!
    image:String
    link:String
}
type User {
    _id: ID
    username: String
    email: String
    password:String
    bookCount: Int
    savedBooks: [Book]
}


type Auth {
    token: ID!
    user: User
  }
type Query{

  me :User
  users: [User]
  user(username: String!): User

}
type Mutation{
    login(email:String!, password:String!):Auth,
    addUser(username:String!,email:String!,password:String!):Auth,
    saveBook(bookId:Int,description:String,authors:[String!],title:String!,image:String, url:String):User
    removeBook(bookId :ID!):User
}
`;

// export typeDefs 
module.exports = typeDefs;