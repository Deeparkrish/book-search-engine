// import the gql tagged template 
const {gql} = require('apollo-server-express');

// create type def 



const typeDefs = gql `

  type Book {
    
    bookId:ID!
    authors :[String] 
    description:String
    image:String
    link:String
    title:String!
}
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

input BookInput{

    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!

}
type Query{

  me :User
 

}
type Auth {
    token: ID
    user: User
  }

type Mutation{
    login(email:String!, password:String!):Auth,
    addUser(username:String!,email:String!,password:String!):Auth,
    saveBook(bookData:BookInput!):User
    removeBook(bookId:String!):User
}
`;

// export typeDefs 
module.exports = typeDefs;