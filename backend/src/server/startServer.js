import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 7100;

const app = express();

// middlewares
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/credit-card", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
