import gql from 'graphql-tag';

export const LOGIN_USER =gql`
mutation login($email:String!,$password String!){
    login(email:$email,password:$password){
        user{
        _id
        username
        }
        token
    
    }
}
`;

export const ADD_USER=gql`
mutation addUser($username:String!,$password String!,$email:String!){
    addUser(email:$email,password:$password, username:$username){
        user{
            _id
            username
            email 
            bookcount 
            savedBooks 
            {
                authors
                bookId
                image
                link
                title
                description
            }
        }
        token
    }
}
`;

export const SAVE_BOOK=gql`
{
    mutation saveBook($title String!,$author String!,bookId Int! ){
        savebook(){
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title

        }
    }
}`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId:$bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
}
`;