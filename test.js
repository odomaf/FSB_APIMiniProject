const baseURL = "https://api.jikan.moe/v4";
const endPoint = "/top/anime";
let rankingType = "movie";
let parameter = `?type='${rankingType}'&order_by=rank`;

let requestURL = baseURL + endPoint + parameter;

console.log(requestURL);

const all = document.getElementById("all");
const favorite = document.getElementById("favorite");
const movie = document.getElementById("movie");

movie.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.target.textContent);
  rankingType = event.target.textContent.trim();
  parameter = `?type=${rankingType}`;
  requestURL = baseURL + endPoint + parameter + "&limit=10";
  console.log(requestURL);

  const titles = [];
  fetch(requestURL)
    .then(function (banana) {
      return banana.json();
    })
    .then(function (body) {
      console.log(body);

      for (const item of body.data) {
        titles.push({ [item.title]: item.rank });
        console.log(item.title);
      }
      console.log(titles);
    });
});

titles.forEach(title => {
  const [key, Value] = Object.entry
  })

// const movieWatchBaseURL = "https://api.watchmode.com/v1/search";
// const movieWatchEndPoint = "/top/anime";
// let rankingType = "movie";
// let parameter = `?type='${rankingType}'&order_by=rank`;

// let requestURL = baseURL + endPoint + parameter;

// console.log(requestURL);
