// import all we need
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviews.DAO.js'

// create an asynchronous function to connect our MongoDB
async function main(){
    
    // we call dotenvconfig to load in the environment variables
    dotenv.config()
    // create an instance of MongoClient and pass in the database URI
        const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
        const port = process.env.PORT || 8000

        try {
            // Connect to the MongoDB cluster
            await client.connect()
            await MoviesDAO.injectDB(client)
            await ReviewsDAO.injectDB(client)
            // start our web server
            app.listen(port, () =>{
                console.log('server is running on port:'+port);
            })
        } catch (e) {
            console.error(e);
            process.exit(1)
        }
}
// catch any errors to the console
main().catch(console.error);