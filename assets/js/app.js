let cl = console.log;

// DOM seletion 
const trendingMovies = document.getElementById('trendingMovies')

// API URL 

const BASE_URL = `https://api.themoviedb.org/3`;
const IMG_URL = `https://image.tmdb.org/t/p/`;
const API_KEY = `72df7708b0060d308acb2be6b8dc5db4`;
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;

const initslider = () => {
$('#trendingMovies').owlCarousel({
    loop:true,
    margin : 0,
    nav:false,
    dots : false,
    responsive:{
        0:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
}

const loadQparams = (ele) => {
    // let id = ele.getAttribute("data-id")
    let id = ele.dataset['id']
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search)
    queryParams.set("movieid" , id)
    currentUrl.search = queryParams.toString();

    let movieRedirectUrl = `${currentUrl.origin}/movieInfo.html${currentUrl.search}`
    window.location.href = movieRedirectUrl;
}  

const insertMainsliderItems = (arr) => {
    trendingMovies.innerHTML =  arr.map(movie => {
               return `
               <div class="item" ${movie.id}>
               <figure class="mb-0 movieCard">
                   <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}" alt="">
                   <figcaption>
                      <h3 class="display-3">
                      ${movie.title || movie.original_title || movie.original_name}
                      </h3>
                      <em class="my-4">
                      ${movie.overview}
                      </em>
                      <p>
                      <button class="btn btn-large btn-red" data-id=${movie.id} onclick="loadQparams(this)">View More</button>
                      </p>
                   </figcaption>
               </figure>
           </div>
                     `
    }).join('')
}


const makeAPIcall = async (apiUrl , methodName , msgbody) => {
    msgbody = msgbody ? JSON.stringify(msgbody) : null
    let res = await fetch(apiUrl ,{
        method : methodName,
        body : msgbody
    })
    return res.json()
}

const fetchAllTrending = async () => {
    let res = await makeAPIcall(TRENDING_URL , 'GET')
     insertMainsliderItems(res.results);
     initslider()
}
fetchAllTrending()