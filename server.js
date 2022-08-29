// import the express and cors middleware and movie.route
import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

// create the server
const app = express();

// add the cors and express middleware for enable to server read and accept JSON in a request's body
app.use(cors());
app.use(express.json());

// specify the initial routes
app.use("/api/v1/movies", movies);
app.use('*', (req, res) => {
    res.status(404).json({ error: "not found" })
});

export default app
