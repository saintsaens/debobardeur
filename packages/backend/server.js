import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { debobardize } from './src/debobardeur.js';
import { connectToSupabase, addEntry } from './src/supabase.js';

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

dotenv.config()

app.get("/api/", (req, res) => {
  res.json("GET request received!")
});

app.post("/api/", (req, res) => {
  const message = req.body.message
  const newText = debobardize(message)
  res.send(newText);

  // Save to supabase.
  const supabase = connectToSupabase(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  addEntry(supabase, message)

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})