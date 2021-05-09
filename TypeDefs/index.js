import { gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    hello: String!
    user: User!
    cats: [Cat]
  }
  type User {
    id: ID!
    username: String
    firstLetter: String
  }
  type Error {
    status: Int!
    message: String!
  }
  type ResponseUser {
    error: [Error]!
    user: User
  }
  input UserArgs {
    username: String!
    password: String!
  }
  type Cat {
      id: ID!
      name: String!
  }
  type Mutation {
    add(args: UserArgs): ResponseUser!
    login(userInfo: UserArgs): String!
    createCat(name: String!): Cat!
  }
  type Subscription {
    newUser: User!
  }
`;
export default typeDefs;
