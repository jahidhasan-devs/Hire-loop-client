import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);

const db = client.db(process.env.BETTER_AUTH_DB);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://hire-loop-client-a4zwyrrdw-jahidsharuar2021-progs-projects.vercel.app",
  ],

  user: {
    additionalFields: {
      role: {
        default: "seeker",
      },

      plan: {
        default: "seeker_free",
      },
    },
  },

  plugins: [admin()],
});
