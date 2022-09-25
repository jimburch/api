import express from 'express';

const hoopsbotRouter = express.Router();

hoopsbotRouter.get('/', (req, res) => {
	res.send({ message: 'NBA hot takes!' });
});

export default hoopsbotRouter;
