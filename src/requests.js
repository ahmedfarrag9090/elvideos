const API_KEY = '45319d384b4b805dab98293785bdb069';

const requests = {
  fetchTrending: `/trending/movie/day?api_key=${API_KEY}`,

  fetchLatest: `/movie/latest?api_key=${API_KEY}&language=en-US&page=1`,

  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,

  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,

  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,

  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,

  fetchRomanticMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,

  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};


export default  requests;