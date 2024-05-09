import express, { json } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import randomstring from 'randomstring';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = path.join(__dirname, 'src');

app.use(cors());

app.use(express.json())

let clients = [];
let completed_jobs = [];

app.post("/webhook/callback", (req, res) => {
  const json_data = req.body;
  console.log('Received JSON data:', json_data);

  completed_jobs.push(json_data);

  res.status(200).send('Data received successfully');
});

app.get("/webhook/callback/:id", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  const interval = setInterval(() => {
    const job = completed_jobs.find(c => c.id === req.params.id);

    if (job) {
      clearInterval(interval);
      res.write(`data: ${JSON.stringify(job)}\n\n`);

      completed_jobs = completed_jobs.filter(curr_job => curr_job.id !== job.id);
    }
  }, 1000);
});

app.get("/register", (req, res) => {
  const id = randomstring.generate();

  const json_data = {
    message: "Successfully created an id.",
    id
  };

  clients.push({ 
    id,
    res
  });

  req.on('close', () => {
    console.log(`Register(54): ${id} Connection closed`);
    clients = clients.filter(client => client.id !== id);
  });

  res.json(json_data);
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
