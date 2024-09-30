import express, { Request, Response } from 'express';
import path from "node:path";

const app = express();
const port: number = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});