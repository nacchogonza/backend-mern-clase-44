import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env"),
});

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PERSISTENCE: process.env.PERSISTENCE || "Mem",
  PORT: process.env.PORT || '8080',
  MODE: process.env.MODE || 'FORK',
  GRAPHIQL: process.env.GRAPHIQL || 'false'
};
