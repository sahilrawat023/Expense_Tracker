const transactionTypeDef = `#graphql

type Transaction {
  _id: ID!
  userId: ID!
  description: String!
  paymentType: String!
  category: String!
  amount: Float!
  location: String
  date: String!
}
type Query {
  transactions: [Transaction!]
  transaction(_id: ID!): Transaction
}
type Mutation {
  createTransaction(userId: ID!, description: String!, paymentType: String!, category: String!, amount: Float!, location: String, date: String!): Transaction!
  updateTransaction(_id: ID!, userId: ID!, description: String!, paymentType: String!, category: String!, amount: Float!, location: String, date: String!): Transaction!
  deleteTransaction(_id: ID!): Transaction!
}
`;
export default transactionTypeDef;
