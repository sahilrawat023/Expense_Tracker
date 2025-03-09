import { users } from "../dummyData/data.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, email, password } = input;
        if (!username || !name || !email || !password) {
          throw new Error("Please fill in all fields");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
          username,
          name,
          email,
          password: hashedPassword,
          gender,
          profilePic: gender === "male" ? boyProilePic : girlProilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.log(err);
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) throw new Error("All fields are required");
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};
export default userResolver;
