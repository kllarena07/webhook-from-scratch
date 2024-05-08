import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = path.join(__dirname, 'src');

app.use(express.json())

app.post("/webhook/call_back", (req, res) => {
  const jsonData = req.body;
  console.log('Received JSON data:', jsonData);
  res.status(200).send('Data received successfully');
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
