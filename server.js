import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { debobardize } from './src/debobardeur.js';

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

dotenv.config()

app.get("/", (req, res) => {
  res.json("GET request received!")
});

app.post("/", (req, res) => {
  const message = req.body.message

  const newText = debobardize(message)

  res.send(newText);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})