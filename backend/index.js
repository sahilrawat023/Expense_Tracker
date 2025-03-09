import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
