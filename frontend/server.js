import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = path.join(__dirname, 'src');

app.use(express.static(staticDir));

app.post("/webhook/call_back", (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
