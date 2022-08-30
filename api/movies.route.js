import express from 'express'


// get access to express router
const router = express.Router();

router.route('/').get((req, res) => res.send('hello world'));

export default router;
