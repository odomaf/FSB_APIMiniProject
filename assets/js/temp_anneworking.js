//takes the string that should be the content of the list item,
//turn it into an li element
function convertToListItem(liContent) {
  //create list items to go in the list
  const liEl = document.createElement("li");
  //each li element needs content created as a text node, then that node gets appended to the li element
  let textNode = document.createTextNode(liContent);
  liEl.appendChild(textNode);
  //return properly converted li
  return liEl;
}
let media = {
  id: "3171191",
  title: "One Piece",
  plot_overview:
    "With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.",
  type: "tv_series",
  runtime_minutes: null,
  release_date: "2023-08-31",
  genre_names: ["Action", "Adventure", "Fantasy"],
  user_rating: "8.2",
  critic_score: "77",
  poster: "https://cdn.watchmode.com/posters/03171191_poster_w342.jpg",
  network_names: ["Netflix"],
  trailer: "https://www.youtube.com/watch?v=Ades3pQbeh8",
};
console.log(media);

//using the id from the returned data to make unique id for card
const cardId = `card_${media.id}`;

//create outer div element for card and set attributes
const cardDiv = document.createElement("div");
cardDiv.setAttribute("id", cardId);
cardDiv.setAttribute("class", "card card-side bg-base-100 shadow-sm w-80");

//create figure element for the card that holds the image
const cardFigure = document.createElement("figure");
cardDiv.appendChild(cardFigure);

//create the image element with the link to the poster from the watchmode object, append to figure
const cardPoster = document.createElement("img");
cardPoster.setAttribute("src", media.poster);
cardPoster.setAttribute("alt", media.type);
cardPoster.setAttribute("class", "poster");
cardFigure.appendChild(cardPoster);

//create the card body that will go to the right of the image on the card and hold the rest of the content
const cardBody = document.createElement("div");
cardBody.setAttribute("class", "card-body");

//create the card title and set it to the title from the watchmode object. append to card body
const cardTitle = document.createElement("h2");
cardTitle.setAttribute("class", "card-title");
cardTitle.innerHTML = media.title;
cardBody.appendChild(cardTitle);

//create cardReleaseDate element, set to release date from watchmode object, append to card body
let cardReleaseDate = document.createElement("p");
cardReleaseDate.innerHTML = media.release_date;
cardBody.appendChild(cardReleaseDate);

//create list to hold other key information like runtime, genres, etc
let cardList = document.createElement("ul");
cardList.setAttribute("style", "list-style-type: none");

//create list items to go in the list
const genresLi = convertToListItem(media.genre_names.join(", "));
genresLi.style.fontStyle = "italic";
cardList.appendChild(genresLi);
//THIS IS THE RUN TIME STUFF, IT DOES NOT APPLY TO TV SERIES SO
//CONDITIONAL STUFF WILL NEED TO HAPPEN HERE
const runningTimeLi = convertToListItem(
  `Running Time: ${media.runtime_minutes}`
);
cardList.appendChild(runningTimeLi);
const userRatingLi = convertToListItem(`User Rating: ${media.user_rating}/10`);
cardList.appendChild(userRatingLi);
const criticRatingLi = convertToListItem(
  `Critic Rating: ${media.critic_score}/100`
);
cardList.appendChild(criticRatingLi);
const streamingLi = convertToListItem(
  `Where to watch: ${media.network_names.join(", ")}`
);
cardList.appendChild(streamingLi);

cardBody.appendChild(cardList);

//create cardDescription element to hold plot overview, set to overview from watchmod object
let cardDescription = document.createElement("p");
cardDescription.innerHTML = media.plot_overview;

//create collapsible plot overview element, append cardDescription to collapsible element
const cardPlotDiv = document.createElement("div");
cardPlotDiv.setAttribute(
  "class",
  "collapse bg-base-100 border-base-300 border"
);
const collapseInputEl = document.createElement("input");
collapseInputEl.setAttribute("type", "checkbox");
cardPlotDiv.appendChild(collapseInputEl);
const collapseTitleDiv = document.createElement("div");
collapseTitleDiv.setAttribute("class", "collapse-title font-semibold w-96");
collapseTitleDiv.innerHTML = "See Summary";
cardPlotDiv.appendChild(collapseTitleDiv);
const collapseContentDiv = document.createElement("div");
collapseContentDiv.setAttribute("class", "collapse-content text-sm");
collapseContentDiv.appendChild(cardDescription);
cardPlotDiv.appendChild(collapseContentDiv);
cardBody.appendChild(cardPlotDiv);

//Append the complete card body to the div
cardDiv.appendChild(cardBody);

//add the card to the correct tab (this will be a case statement checking watchmode object type and appending based on that)
const movieTabEl = document.getElementById("movies-tab");
movieTabEl.appendChild(cardDiv);
