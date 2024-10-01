document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default action (if necessary)
      document.getElementById("search__button").click(); // Simulates a button click
  }
});

function openMenu(){
  document.querySelector(".menu").style.display = "block"
}

function closeMenu(){
  document.querySelector(".menu").style.display = "none"

}

async function fetchMovieData() {
  const search = document.getElementById("search").value
  
  const encodedSearch = encodeURIComponent(search)
  console.log(encodedSearch)
  const search_string = `http://www.omdbapi.com/?i=tt3896198&apikey=421fadc&s=${encodedSearch}`

  const response = await fetch(search_string) 
  let movies = await response.json()
 
  console.log(movies.Response)
  if (movies.Response == 'False' || search.length === 0){
  console.log(movies.Error)

    if (movies.Error == "Movie not found!"){
      console.log("Not found")
      document.getElementById('default').style.display = 'flex'

      document.getElementById('movies').style.display = "none"
      document.getElementById('error__img--nf').style.display = "block"
      document.getElementById('error__img--tm').style.display = "none"
      document.getElementById('default__img').style.display = "none"
      document.getElementById("search__results--text").innerHTML = `no <span class="red">movies</span> found! try a different search`
    }
    else if (movies.Error == "Too many results."){
      console.log("Too many")
      document.getElementById('default').style.display = 'flex'

      document.getElementById('movies').style.display = "none"
      document.getElementById('error__img--tm').style.display = "block"
      document.getElementById('error__img--nf').style.display = "none"
      document.getElementById('default__img').style.display = "none"
      document.getElementById("search__results--text").innerHTML = "too many results. try a longer search"
    }
  }
  else {
  movies = movies.Search

  let movies_html = ""
  
 

  for (let i = 0; i < movies.length; ++i){
    let movie = movies[i]
    movies_html += `<div class="movie">
        <img class="movie__poster" src="${movie.Poster}" alt="" />
        <h3 class="movie__title">${movie.Title}</h3>
        <h3 class="movie__title">${movie.Year}</h3>
      </div>`

  document.getElementById('default').style.display = 'none'
  document.getElementById('movies').style.display = 'flex'

  document.getElementById('movies').innerHTML = movies_html
    if (i === 5) {
      break
    }
  }

  let movie = movies[1]
  console.log(movie)
  }


  /*
  
  */
}

