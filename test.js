const baseURL = "https://api.jikan.moe/v4";
const endPoint = "/top/anime";
let rankingType = "movie"
let parameter = `?type='${rankingType}'`;

let requestURL = baseURL + endPoint + parameter;


console.log(requestURL);

const all = document.getElementById("all");
const favorite = document.getElementById("favorite");
const movie = document.getElementById("movie");

movie.addEventListener("click",function(event){
  console.log(event.target);
  console.log(event.target.textContent);
  rankingType = event.target.textContent.trim();
  parameter = `?type=${rankingType}`;
  requestURL = baseURL + endPoint + parameter + "&limit=10";
  console.log(requestURL);


  fetch(requestURL)
  .then(function(banana){
    return banana.json()
  })
  .then(function(body){
    console.log(body);
    const titles = [];
    for(const title of body[data]){
      titles.push(title.title_english);
    }
    console.log(titles);

  })

})



