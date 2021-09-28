// import the gql tagged template 
const {gql} = require('apollo-server-express');

// create type def 
// The Thought data type will be the custom Thought data type.
 // Query will return an array of thoughts 

 //// an Auth type must return a token and can optionally include any other user data.
// type Author {
//     _id: ID
//     firstName: String
//     lastName: String
//     books: [Book]
//   }
const typeDefs = gql `

  type Book {
    
    bookId:ID!
    description:String
    authors :[String] 
    title:String!
    image:String
    link:String
}
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
}

input BookData{
  bookId:String!
    authors: [String]
    title: String!
    description: String
    image: String
    link: String

}

type Auth {
    token: ID!
    user: User
  }
type Query{

  me :User
 

}
type Mutation{
    login(email:String!, password:String!):Auth,
    addUser(username:String!,email:String!,password:String!):Auth,
    saveBook(input:BookData):User
    removeBook(bookId:ID!):User
}
`;

// export typeDefs 
module.exports = typeDefs;