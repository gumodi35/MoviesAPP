// let movies store the reference to the database
let movies

// export the class MoviesDAO and provides the database reference to movies
export default class MoviesDAO{
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
     moviesPerPage = 20,
 } = {}){
     let query
     if(filters){
         if("title" in filters){
             query = { $text: { $search: filters['title']}}
         } else if("rated" in filters){
             query = { "rated": { $eq: filters["rated"]}}
         }
     }
 
     query = { "rated": filters["rated"]}

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
