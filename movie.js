const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
const movies = data.movies

class Movie {
     constructor() {
          this.movieId
          this.name
          this.category
          this.description
          this.duration
     }

     getMovies() {
          return data.movies
     }

     findMovie(id) {
          var i;
          movies.forEach((movie,index) => {
               if (movie.id == id){
                    i = index
               }
          });

          return movies[i] ||null|| "Nothing found"
     }

     addMovie(data) {
          fs.writeFile("", data, 'utf-8', (err) => {

          })
     }

     updateMovie() {

     }

     deleteMovie() {

     }

     getCount() {
          return movies.length
     }
}

var mov = new Movie

console.log(mov.getMovies())

module.exports = new Movie