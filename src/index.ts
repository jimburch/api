import express from 'express';
import hoopsbotRouter from './routes/hoopsbot.routes';

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send({ message: 'Hello World' });
});

app.use('/hoopsbot', hoopsbotRouter);

app.listen(PORT, () => {
	console.log(`We're kickin' on ${PORT} 🤘`);
});
