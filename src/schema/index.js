const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers');

// GraphQL Types
const typeDefs = `  
  type Query {
    allLinks(filter: LinkFilter, skip: Int, first: Int): [Link!]!
  }
  
  type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }
  
  type Subscription {
    Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    votes: [Vote!]!
  }

  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }
  
  type Vote {
    id: ID!
    user: User!
    link: Link!
  }
  
  type SigninPayload {
    token: String
    user: User
  }
  
  type LinkSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Link
  }
  
  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }
  
  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
  
  input LinkSubscriptionFilter {
    mutation_in: [_ModelMutationType!] 
  }
  
  input LinkFilter {
    OR: [LinkFilter!]
    description_contains: String
    url_contains: String
  }
  
  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});