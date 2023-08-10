import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { parseValue } from './parser';
import { Metadata } from './models';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
  res.send({ message: 'GOOD LUCK 🌟' });
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

app.get('/api/meta', (_req, res) => {
  try {
    // Read the JSON file synchronously
    const fileContent = fs.readFileSync('./dummy_data.json', 'utf-8');

    // Parse the JSON content
    const data = JSON.parse(fileContent);

    const metadata: { [key: string]: Metadata } = {};

    for (const row of data) {
      for (const key in row) {
        // eslint-disable-next-line no-prototype-builtins
        if (row.hasOwnProperty(key)) {
          const value = row[key];

          if (!metadata[key]) {
            metadata[key] = {
              dataType: "",
              values: [],
            };
          }

          if (!metadata[key].values.includes(value)) {
            metadata[key].values.push(value);
          }

          if (metadata[key].dataType === "") {
            const { dataType } = parseValue(value);
            metadata[key].dataType = dataType;
          }

          if (
            metadata[key].dataType === "number" ||
            metadata[key].dataType === "date"
          ) {
            const parsedValue = parseValue(value).parsedValue;
            metadata[key].values = metadata[key].values.map((val) =>
              val === value ? parsedValue : val
            );
          }
        }
      }
    }

    for (const key in metadata) {
      const metadataItem = metadata[key];
      switch (metadataItem.dataType) {
        case "number":
        case "date":
          metadataItem.min = Math.min(...metadataItem.values);
          metadataItem.max = Math.max(...metadataItem.values);
          break;
        case "boolean":
          metadataItem.trueCount = metadataItem.values.filter(Boolean).length;
          metadataItem.falseCount =
            metadataItem.values.length - metadataItem.trueCount;
          break;
      }
    }
    // Return the metadata as JSON response
    res.status(200).json(metadata);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the data." });
  }
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}...🚀`);
});
