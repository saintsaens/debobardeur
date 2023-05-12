import express from 'express'
import cors from 'cors'
import './loadEnv.js';
import { debobardize } from './src/debobardeur.js';
import { createPageInDatabase } from "./src/notion/notion-page.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("You’ve reached the débobardeur. Please leave a message.");
});

app.post("/", (req, res) => {
  const incomingText = req.body.message;
  const output = debobardize(incomingText);
  const outputText = output.text;
  const outputModifications = output.modifications;

  // Save to Notion.
  createPageInDatabase(process.env.NOTION_DATABASE_ID_TEXTS_USERS, incomingText, outputText)
  
  res.send({text: outputText, modifications: outputModifications});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app;