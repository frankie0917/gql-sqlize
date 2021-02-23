import express from "express";
import 'dotenv/config'

const app = express();

app.get("/hello", (_, res) => {
  res.send("world");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
