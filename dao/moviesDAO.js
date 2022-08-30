// let movies store the reference to the database
let movies

// export the class MoviesDAO and provides the database reference to movies
export default class MoviesDao{
    static async injectDB(conn){
        if(movies){
            return
        }
        try {
        movies = await conn.db(process.env.MOVIEREVIEW_NS)
        .collection("movies")
    } 
    catch(e){
        console.error(`unable to connect in MoviesDAO:${e}`)
    }
 }
 // add the method to get all movies from database
 static async getMovies({
     filters = null,
     page = 0,
     moviesPerpage = 20,
 } = {}){
     let query
     if(filters){
         if(filters.hasOwnProperty('title')){
             query = { $text: { $search: filter['title']}}
         } else if(filters.hasOwnProperty("rated")){
             query = { "rated": { $eq: filters["rated"]}}
         }
     }
 
     let cursor
     try{
             cursor = await movies
             .find(query)
             .limit(moviesPerPage)
             .skip(moviesPerPage * page)
         const moviesList = await cursor.toArray()
         const totalNumMovies = await movies.countDocuments(query)
         return { moviesList, totalNumMovies }
     }
     catch(e){
         console.error(`Unable to issue find command, ${e}`)
         return { moviesList:[], totalNumMovies: 0}
     }
   }
}
