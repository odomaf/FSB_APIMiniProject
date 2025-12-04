const baseURL = "https://api.jikan.moe/v4";
const endPoint = "/top/anime";
const favorite = document.getElementById("favorite");
const titles = [];

favorite.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.target.textContent);
  rankingType = event.target.textContent.trim();
  parameter = `?filter=${rankingType}`;
  requestURL = baseURL + endPoint + parameter + "&limit=10";
  console.log(requestURL);

  fetch(requestURL)
    .then(function (responseFromJikan) {
      return responseFromJikan.json();
    })
    .then(function (javaScriptObjectfromJikan) {
      console.log(javaScriptObjectfromJikan);
      //OBJECTIVE : CREATE AN OBJECT TO STORE DATA IN A WAY USABLE TO ME
      // console.log(javaScriptObjectfromJikan["data"]);
      console.log(javaScriptObjectfromJikan.data);
      console.log(javaScriptObjectfromJikan.data[0]);
      console.log(javaScriptObjectfromJikan.data[0]["title_english"]);
      console.log(javaScriptObjectfromJikan.data[0].rank);
      console.log(
        javaScriptObjectfromJikan.data[0]["images"]["jpg"]["small_image_url"]
      );
      console.log(javaScriptObjectfromJikan.data[0].images.jpg.large_image_url);
      let animeData = {
        title: javaScriptObjectfromJikan.data[0]["title_english"],
        rank: javaScriptObjectfromJikan.data[0].rank,
        "small image url":
          javaScriptObjectfromJikan.data[0].images.jpg.small_image_url,
      };
    });
});

// console.log(titles);
// titles.forEach((title) => {
//   const [key, Value] = Object.entry;
// });

// const movieWatchBaseURL = "https://api.watchmode.com/v1/search";
// const movieWatchEndPoint = "/list-titles";
// let rankingType = "movie";
// let parameter = `?type='${rankingType}'&order_by=rank`;

// let requestURL = baseURL + endPoint + parameter;

// let media = {
//   id: "3171191",
//   title: "One Piece",
//   plot_overview:
//     "With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.",
//   type: "tv_series",
//   runtime_minutes: null,
//   release_date: "2023-08-31",
//   genre_names: ["Action", "Adventure", "Fantasy"],
//   user_rating: "8.2",
//   critic_score: "77",
//   poster: "https://cdn.watchmode.com/posters/03171191_poster_w342.jpg",
//   network_names: ["Netflix"],
//   trailer: "https://www.youtube.com/watch?v=Ades3pQbeh8",
//
