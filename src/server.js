import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import pino from 'pino-http';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

const PORT = process.env.PORT || 3030;


app.get('/notes', (req, res) => {
  res.status(200).json({
	"message": "Retrieved all notes"
}
);
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

app.get('/test-error', (req, res, next) => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({
  "message": "Route not found"
}
);
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
  "message": "Simulated server error"
}
);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
