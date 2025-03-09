const userTypeDef = `#graphql

type User {
  _id: ID!
  username: String!
  name: String!
  password: String!
  profilePicture: String
  gender: String!
}
type Query {
  users: [User!]
  authUser: User
  user(userId: ID!): User
}
type Mutation {
  signup(username: String!, name: String!, password: String!, profilePicture: String, gender: String!): User!
  login(username: String!, password: String!): User!
  updateUser(_id: ID!, username: String!, name: String!, password: String!, profilePicture: String, gender: String!): User!
  logout: LogoutResponse!
}
type LogoutResponse {
  message: String!
}

`;

export default userTypeDef;
