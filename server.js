import express from 'express'
import { debobardize } from './src/debobardeur.js';
const app = express()
const port = 3000

app.use(express.json());

import * as dotenv from 'dotenv'
dotenv.config()

app.post("/", (req, res) => {
  const message = req.body.message

  const newText = debobardize(message)

  res.send(newText);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})