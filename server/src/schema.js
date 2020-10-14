const { gql } = require('apollo-server');

const schema = gql`
  scalar DateTime

  type Query {
    info: String!
    feed(
      filter: String
      skip: Int
      take: Int
      orderBy: LinkOrderByInput
    ): Feed!
  }

  enum LinkOrderByInput {
    description_ASC
    description_DESC
    url_ASC
    url_DESC
    createdAt_ASC
    createdAt_DESC
  }

  type Feed {
    id: ID!
    links: [Link!]!
    count: Int!
  }

  type Mutation {
    createPost(url: String!, description: String!): Link!
    signup(
      email: String!
      password: String!
      name: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote!
  }

  type Subscription {
    newLink: Link
    newVote: Vote
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }

  type Link {
    id: ID!
    createdAt: DateTime!
    description: String!
    url: String!
    postedBy: User
    votes: [Vote!]!
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
`;

module.exports = schema;
