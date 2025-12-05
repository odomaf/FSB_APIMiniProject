//object array for testing card display
let watchmode = [
  {
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
  },
  {
    id: "1649495",
    title: "One Piece Film Red",
    plot_overview:
      "Uta — the most beloved singer in the world. Her voice, which she sings with while concealing her true identity, has been described as “otherworldly.” She will appear in public for the first time at a live concert. As the venue fills with all kinds of Uta fans — excited pirates, the Navy watching closely, and the Straw Hats led by Luffy who simply came to enjoy her sonorous performance — the voice that the whole world has been waiting for is about to resound.",
    type: "movie",
    runtime_minutes: "115",
    release_date: "2022-08-06",
    genre_names: ["Animation", "Adventure", "Action", "Fantasy", "Music"],
    user_rating: "6.9",
    critic_score: "83",
    poster: "https://cdn.watchmode.com/posters/01649495_poster_w342.jpg",
    network_names: null,
    trailer: "https://www.youtube.com/watch?v=r0FvP_Ui-xY",
  },
  {
    id: "3215358",
    title: "One Piece Characters Log",
    plot_overview:
      "One Piece Characters Log is a series of recap episodes for the One Piece anime, made to commemorate the release of One Piece Film: Gold. The episodes recap the stories of each of the nine Straw Hat Pirates until the Dressrosa Arc, and are narrated by Bartolomeo. Each episode is around 30 minutes. Originally airing weekly on television from June 19 to September 11, 2016, the episodes were also released on four DVDs",
    type: "tv_miniseries",
    runtime_minutes: "30",
    release_date: "2016-06-20",
    genre_names: ["Animation", "Action & Adventure"],
    network_names: ["Fuji TV"],
    trailer: null,
    poster: "https://cdn.watchmode.com/posters/03215358_poster_w342.jpg",
    type: "tv_special",
    runtime_minutes: "46",
  },
  {
    id: "479035",
    title: "One Piece: Protect! The Last Great Stage",
    plot_overview:
      "Aired after Episode 174 - It is the last performance of a great actor and playwright, but several actors suddenly quit. Luckily, the Straw Hats offer to take their place. However, the quitting actors turns out to be more than a coincidence when they meet a Marine with a grudge against the playwright.",
    type: "tv_special",
    runtime_minutes: "46",
    release_date: "2003-12-14",
    genre_names: ["Action", "Animation", "Adventure", "Comedy", "TV Movie"],
    user_rating: "7",
    critic_score: null,
    poster: "https://cdn.watchmode.com/posters/0479035_poster_w342.jpg",
    network_names: null,
    trailer: null,
  },
  {
    id: "4160209",
    title: "One Piece TV Special: Adventure in the Ocean's Navel",
    plot_overview: null,
    type: "tv_movie",
    runtime_minutes: "49",
    release_date: "2000-12-20",
    genre_names: ["Animation", "Action", "Adventure", "TV Movie"],
    user_rating: "6.4",
    critic_score: null,
    poster: "https://cdn.watchmode.com/posters/04160209_poster_w342.jpg",
    network_names: null,
    trailer: null,
  },
  {
    id: "2368682",
    title: "One Piece: Dream Soccer King!",
    plot_overview:
      'At a huge pillar stadium, the Grand Line Cup Final is being held. The "Straw Hat Pirate Team"(Luffy, Zoro, Usopp, Sanji, and Chopper) are having a tie breaker shoot out against the "Villian All Star Team"(Buggy, Bon Clay, Jango, Hatchan, and a soccer like head player named Odacchi). Everyone of them gets a turn in kicking the ball to the goal. While Coby is taking the goalie position, and isn\'t doing too good in blocking the goal. One after another, the game eventually comes to a sudden death match. Which team will win the Grand Line Cup?',
    type: "short_film",
    runtime_minutes: "5",
    release_date: "2002-03-02",
    genre_names: ["Fantasy", "Comedy", "Animation"],
    user_rating: "6.6",
    critic_score: null,
    poster: "https://cdn.watchmode.com/posters/02368682_poster_w342.jpg",
    network_names: null,
    trailer: null,
  },
];
//console.log(watchmode);

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

function getCleanString(key, content) {
  // console.log(
  //   `Checking for null for with key: ${key} and content ${content}`
  // );
  switch (key) {
    case "critic_score":
      if (content == "null" || content == "undefined") {
        //console.log(`We have determined ${content} is null or undefined`);
        content = "Not reviewed by critics";
      } else {
        //console.log(`We have determined content is fine`);
        content = `${content}/100`;
      }
      break;
  }

  return content;
}
function createCard(watchmode) {
  //using the id from the returned data to make unique id for card
  const cardId = `card_${watchmode.id}`;

  //create outer div element for card and set attributes
  const cardDiv = document.createElement("div");
  cardDiv.setAttribute("id", cardId);
  cardDiv.setAttribute("class", "card card-side bg-base-100 shadow-sm m-4");

  //create figure element for the card that holds the image
  const cardFigure = document.createElement("figure");
  cardDiv.appendChild(cardFigure);

  //create the image element with the link to the poster from the watchmode object, append to figure
  const cardPoster = document.createElement("img");
  cardPoster.setAttribute("src", watchmode.poster);
  cardPoster.setAttribute("alt", watchmode.type);
  cardPoster.setAttribute("class", "poster w-24");
  cardFigure.appendChild(cardPoster);

  //create the card body that will go to the right of the image on the card and hold the rest of the content
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  //create the card title and set it to the title from the watchmode object. append to card body
  const cardTitle = document.createElement("h2");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = watchmode.title;
  cardBody.appendChild(cardTitle);

  //create cardReleaseDate element, set to release date from watchmode object, append to card body
  let cardReleaseDate = document.createElement("p");
  cardReleaseDate.innerHTML = watchmode.release_date;
  cardBody.appendChild(cardReleaseDate);

  //create list to hold other key information like runtime, genres, etc
  let cardList = document.createElement("ul");
  cardList.setAttribute("style", "list-style-type: none");

  //create list items to go in the list
  const genresLi = convertToListItem(watchmode.genre_names.join(", "));
  genresLi.style.fontStyle = "italic";
  cardList.appendChild(genresLi);
  //THIS IS THE RUN TIME STUFF, IT DOES NOT APPLY TO TV SERIES SO
  //CONDITIONAL STUFF WILL NEED TO HAPPEN HERE
  const runningTimeLi = convertToListItem(
    `Running Time: ${watchmode.runtime_minutes}m`
  );
  cardList.appendChild(runningTimeLi);
  const userRatingLi = convertToListItem(
    `User Rating: ${watchmode.user_rating}/10`
  );
  cardList.appendChild(userRatingLi);
  let criticScore = getCleanString(
    `${watchmode.title}`,
    "critic_score",
    `${watchmode.critic_score}`
  );
  const criticRatingLi = convertToListItem(`Critic Rating: ${criticScore}`);
  cardList.appendChild(criticRatingLi);
  let networkNames = "";
  if (watchmode.network_names === null) {
    networkNames = "No platforms";
  } else {
    networkNames = watchmode.network_names.join(", ");
  }
  const streamingLi = convertToListItem(`Where to watch: ${networkNames}`);
  cardList.appendChild(streamingLi);
  cardBody.appendChild(cardList);

  //create anchor tag for trailer element, set to trailer url from watchmode object, append to cardBody
  const cardTrailerUrl = document.createElement("a");
  cardTrailerUrl.setAttribute("href", watchmode.trailer);
  cardTrailerUrl.setAttribute(
    "class",
    "text-primary hover:underline font-semibold"
  );
  cardTrailerUrl.innerHTML = "Watch Trailer";
  cardBody.appendChild(cardTrailerUrl);

  //create cardDescription element to hold plot overview, set to overview from watchmode object
  let cardDescriptionDiv = document.createElement("div");
  cardDescriptionDiv.setAttribute("class", "tooltip tooltip-bottom");
  cardDescriptionDiv.setAttribute("data-tip", watchmode.plot_overview);
  let descriptionHoverEl = document.createElement("button");
  descriptionHoverEl.setAttribute("class", "btn btn-primary");
  descriptionHoverEl.innerHTML = "Read Summary";
  cardDescriptionDiv.appendChild(descriptionHoverEl);
  cardBody.appendChild(cardDescriptionDiv);

  //Append the complete card body to the div
  cardDiv.appendChild(cardBody);
  return cardDiv;
}

function setTabLabel(id, label) {
  const tab = document.getElementById(id);
  tab.setAttribute("aria-label", label);
}

//counting variables for the loop to track how many of each type of watchmode we have to add to tabs
let countMovies = 0;
let countTvSeries = 0;
let countTvSpecials = 0;
let countTvMovies = 0;
let countTvMiniseries = 0;
let countShortFilms = 0;

//grab the grid elements on each tab to populate in the loop
const tvSeriesGridEl = document.getElementById("tv-series-grid");
const movieGridEl = document.getElementById("movies-grid");
const tvSpecialsGridEl = document.getElementById("tv-specials-grid");
const tvMoviesGridEl = document.getElementById("tv-movies-grid");
const tvMiniseriesGridEl = document.getElementById("tv-miniseries-grid");
const shortFilmsGridEl = document.getElementById("short-films-grid");

//loop through objects in watchmode results array and create cards then display them for each object
for (i = 0; i < watchmode.length; i++) {
  const card = createCard(watchmode[i]);
  // console.log(`${watchmode[i].title} is ${watchmode[i].type}`);

  //add the card to the correct tab (this will be a case statement checking watchmode object type and appending based on that)
  switch (watchmode[i].type) {
    case "movie":
      movieGridEl.appendChild(card);
      countMovies++;
      break;
    case "tv_series":
      tvSeriesGridEl.appendChild(card);
      countTvSeries++;
      break;
    case "tv_special":
      tvSpecialsGridEl.appendChild(card);
      countTvSpecials++;
      break;
    case "tv_movie":
      tvMoviesGridEl.appendChild(card);
      countTvMovies++;
      break;
    case "tv_miniseries":
      tvMiniseriesGridEl.appendChild(card);
      countTvMiniseries++;
      break;
    case "short_film":
      shortFilmsGridEl.appendChild(card);
      countShortFilms++;
      break;
    default:
      break;
  }
}
//set labels on tabs to include the number of cards on that tab, so users
//can easily see how many of each type are available to check out
setTabLabel("movies", `Movies (${countMovies})`);
setTabLabel("tv_series", `TV Series (${countTvSeries})`);
setTabLabel("tv_specials", `TV Specials (${countTvSpecials})`);
setTabLabel("tv_movies", `TV Movies (${countTvMovies})`);
setTabLabel("tv_miniseries", `TV Miniseries (${countTvMiniseries})`);
setTabLabel("short_films", `Short Films (${countShortFilms})`);
