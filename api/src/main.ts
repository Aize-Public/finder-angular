import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/api/search', (_req, res) => {
  const filePath = path.join('./dummy_data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}...🚀`);
});
