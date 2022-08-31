import express from 'express'
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js'

// get access to express router
const router = express.Router();

//router.route('/').get((req, res) => res.send('hello world'));
router.route('/').get(MoviesController.apiGetMovies)

router
     .route("/review")
     router.route("/id/:id").get(MoviesController.apiGetMovieById)
     router.route("/ratings").get(MoviesController.apiGetRatings)
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router;
