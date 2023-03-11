import express from 'express'
import cors from 'cors'
import './loadEnv.js';
import { debobardize } from './src/debobardeur.js';
import { createPageInDatabase } from "./src/notion/notion-page.js";

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("GET request received!")
});

app.post("/", (req, res) => {
  const message = req.body.message
  const newText = debobardize(message)
  res.send(newText);
  
  // Save to Notion.
  createPageInDatabase(process.env.NOTION_DATABASE_ID_TEXTS_USERS, message, newText)

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app;