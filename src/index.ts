import express from 'express';

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send({ message: 'Hello World' });
});

app.listen(PORT, () => {
	console.log(`We're kickin' on ${PORT} 🤘`);
});
