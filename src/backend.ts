import express from 'express';
import path from 'path';
import cors from 'cors';
import { trpcMiddleware } from 'backend';

const publicDir = path.join(__dirname, '..', 'public');

const app = express();

app.use(cors());

app.use(express.static(publicDir));

app.use('/trpc', trpcMiddleware);

app.use('*', (_req, res) => {
    return res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(3000, () => {
    console.log('Trpc server listening on port 3000');
});
