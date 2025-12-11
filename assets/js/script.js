const baseURL = "https://api.jikan.moe/v4";
const endPoint = "/top/anime";
const favorite = document.getElementById("favorite");
const popular = document.getElementById("popular");
const titles = [];
const titleDetails = [];

//Can make it more persistant with localstorage
function watchmodeResponseCache(anime, requestURL, details) {
  //Checking if request is for anime details from watchmode
  const cached = localStorage.getItem(`${anime}`);

  if (!details) {
    if (cached) {
      console.log("From cache:");
      const parsed = JSON.parse(cached);
      return Promise.resolve(parsed.ids);
    } else {
      return fetch(requestURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (responseData) {
          console.log("Fetch called.");

          const ids = responseData.title_results.map((result) => result.id);

          localStorage.setItem(`${anime}`, JSON.stringify({ ids }));
          return ids;
        });
    }
  } else {
    const parsed = cached ? JSON.parse(cached) : null;

    if (parsed && parsed.titleDetails) {
      console.log("From cache:");
      return Promise.resolve(parsed.titleDetails);
    } else {
      return fetch(requestURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (responseData) {
          console.log("Fetch called.");

          const titleDetail = {
            title: responseData.title,
            plot_overview: responseData.plot_overview,
            type: responseData.type,
            runtime_minutes: responseData.runtime_minutes,
            release_date: responseData.release_date,
            genre_names: responseData.genre_names,
            user_rating: responseData.user_rating,
            critic_score: responseData.critic_score,
            poster: responseData.poster,
            network_names: responseData.network_names,
            trailer: responseData.trailer,
          };

          const freshCacheString = localStorage.getItem(`${anime}`);
          const freshCache = freshCacheString
            ? JSON.parse(freshCacheString)
            : {};

          //Checking if an array already exists before appending
          if (!freshCache.titleDetails) {
            freshCache.titleDetails = [];
          }

          freshCache.titleDetails.push(titleDetail);

          localStorage.setItem(`${anime}`, JSON.stringify(freshCache));
          return freshCache.titleDetails;
        });
    }
  }
}

favorite.addEventListener("click", function (event) {
  // console.log(event.target);
  // console.log(event.target.getAttribute("data-filter"));
  rankingType = event.target.getAttribute("data-filter");
  parameter = `?filter=${rankingType}`;
  requestURL = baseURL + endPoint + parameter + "&limit=10";
  // console.log(requestURL);

  fetch(requestURL)
    .then(function (responseFromJikan) {
      return responseFromJikan.json();
    })
    .then(function (javaScriptObjectfromJikan) {
      // console.log(javaScriptObjectfromJikan);
      //OBJECTIVE : CREATE AN OBJECT TO STORE DATA IN A WAY USABLE TO ME
      // console.log(javaScriptObjectfromJikan["data"]);
      // console.log(javaScriptObjectfromJikan.data);
      // console.log(javaScriptObjectfromJikan.data[0]);
      // console.log(javaScriptObjectfromJikan.data[0]["title_english"]);
      // console.log(javaScriptObjectfromJikan.data[0].rank);
      // console.log(
      //   javaScriptObjectfromJikan.data[0]["images"]["jpg"]["small_image_url"]
      // );
      // console.log(javaScriptObjectfromJikan.data[0].images.jpg.large_image_url);

      titles.splice(0, titles.length);

      for (let index = 0; index < 10; index++) {
        let animeData = {
          jikanTitle: javaScriptObjectfromJikan.data[index]["title_english"],
          jikanRank: javaScriptObjectfromJikan.data[index].rank,
          jikanSmallImageUrl:
            javaScriptObjectfromJikan.data[index].images.jpg.small_image_url,
        };
        titles.push(animeData);
      }

      addListItem(titles);
    });
});

popular.addEventListener("click", function (event) {
  // console.log(event.target);
  rankingType = event.target.getAttribute("data-filter");
  parameter = `?filter=${rankingType}`;
  requestURL = baseURL + endPoint + parameter + "&limit=10";
  // console.log(requestURL);

  fetch(requestURL)
    .then(function (responseFromJikan) {
      return responseFromJikan.json();
    })
    .then(function (javaScriptObjectfromJikan) {
      // console.log(javaScriptObjectfromJikan);
      //OBJECTIVE : CREATE AN OBJECT TO STORE DATA IN A WAY USABLE TO ME
      // console.log(javaScriptObjectfromJikan["data"]);
      // console.log(javaScriptObjectfromJikan.data);
      // console.log(javaScriptObjectfromJikan.data[0]);
      // console.log(javaScriptObjectfromJikan.data[0]["title_english"]);
      // console.log(javaScriptObjectfromJikan.data[0].rank);
      // console.log(
      //   javaScriptObjectfromJikan.data[0]["images"]["jpg"]["small_image_url"]
      // );
      // console.log(javaScriptObjectfromJikan.data[0].images.jpg.large_image_url);

      titles.splice(0, titles.length);

      for (let index = 0; index < 10; index++) {
        let animeData = {
          jikanTitle: javaScriptObjectfromJikan.data[index]["title_english"],
          jikanRank: javaScriptObjectfromJikan.data[index].rank,
          jikanSmallImageUrl:
            javaScriptObjectfromJikan.data[index].images.jpg.small_image_url,
        };
        titles.push(animeData);
      }

      addListItem(titles);
    });
});

function addListItem(titles) {
  const topFaves = document.getElementById("topFaves");

  if (topFaves.children.length !== 0) {
    const ul = document.getElementById("anime-list");
    ul.remove();
  }

  const topFavesList = document.createElement("ul");
  topFavesList.className = "list bg-base-100 rounded-box shadow-md";
  topFavesList.id = "anime-list";

  const topFavesRows = titles.map((title) => {
    const titleRow = document.createElement("li");
    titleRow.className = "list-row";

    // const titleRank = document.createElement("div");
    // titleRank.className = "text-4xl font-thin opacity-90 tabular-nums";
    // titleRank.innerHTML = title.jikanRank;

    const titleImgContainer = document.createElement("div");

    const titleImage = document.createElement("img");
    titleImage.className = "size-10 rounded-box";
    titleImage.setAttribute("src", `${title.jikanSmallImageUrl}`);

    titleImgContainer.appendChild(titleImage);

    const titleNameContainer = document.createElement("div");
    titleNameContainer.className = "list-col-grow";

    const titleName = document.createElement("div");
    titleName.className =
      "text-3xl uppercase font-semibold opacity-100 anime-title";
    titleName.innerHTML = `${title.jikanTitle}`;

    titleNameContainer.appendChild(titleName);

    const titleButton = document.createElement("button");
    titleButton.className = "btn btn-square btn-ghost";

    //Need to use createElementNS for svg and svg related tags

    const svgNameSpace = "http://www.w3.org/2000/svg";

    const titleButtonSvg = document.createElementNS(svgNameSpace, "svg");
    titleButtonSvg.setAttribute("class", "size-[1.2em]"); //SVG non-depricated way to set class instead of .classname =
    titleButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    titleButtonSvg.setAttribute("viewBox", "0 0 24 24");

    const titleButtonSvgGroup = document.createElementNS(svgNameSpace, "g");
    const svgGroupAttributes = {
      "stroke-linejoin": "round",
      "stroke-linecap": "round",
      "stroke-width": "2",
      fill: "none",
      stroke: "currentColor",
    };

    Object.entries(svgGroupAttributes).forEach(([key, value]) => {
      titleButtonSvgGroup.setAttribute(key, value);
    });

    const titleButtonSvgPath = document.createElementNS(svgNameSpace, "path");
    titleButtonSvgPath.setAttribute("d", "M6 3L20 12 6 21 6 3z");

    titleButtonSvgGroup.appendChild(titleButtonSvgPath);
    titleButtonSvg.appendChild(titleButtonSvgGroup);
    titleButton.appendChild(titleButtonSvg);

    //Call functionality
    titleButton.addEventListener("click", function () {
      const baseURL = "https://api.watchmode.com/v1";
      const endPoint = "/search";
      const watchmodeApiKey = "ZrI3YIL51rLJL91Ep8nSU2BUbaJKM7nzep3P1wLb";
      parameter = `/?apiKey=${watchmodeApiKey}&search_field=name&search_value=${encodeURIComponent(
        title.jikanTitle
      )}`;

      requestURL = baseURL + endPoint + parameter;

      watchmodeResponseCache(title.jikanTitle, requestURL, false).then(
        (titleIds) => {
          titleIds.forEach((id) =>
            fetchTitleDetails(title.jikanTitle, id, watchmodeApiKey)
          );
        }
      );
    });

    // titleRow.appendChild(titleRank);
    titleRow.appendChild(titleImgContainer);
    titleRow.appendChild(titleNameContainer);
    titleRow.appendChild(titleButton);

    return titleRow;
  });

  const topListTitle = document.createElement("li");
  topListTitle.className = "p-4 pb-2 text-5xl opacity-100 tracking-wide";
  topListTitle.innerHTML = "Top 10";

  topFavesList.appendChild(topListTitle);
  for (const topFaveRow of topFavesRows) {
    topFavesList.append(topFaveRow);
  }

  topFaves.append(topFavesList);
}

function fetchTitleDetails(anime, id, watchmodeAPIKey) {
  console.log(`Title Id: ${id}`);
  const wmTitleDetailsBaseUrl = "https://api.watchmode.com/v1/title/";
  const wmTitleDetailsTailUrl = `/details/?apiKey=${watchmodeAPIKey}`;
  let wmTitleDetailsRequestUrl = `${wmTitleDetailsBaseUrl}${id}${wmTitleDetailsTailUrl}`;

  watchmodeResponseCache(anime, wmTitleDetailsRequestUrl, true)
    .then((watchmode) => {
      displayCards(watchmode);
    })
    .catch(function (error) {
      console.error(`Network or fetch error: ${error}`);
    });
}

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

//checks for empty or null content for an item from a watchmode object
//if it is empty or null, returns a replacement content string
//Parameters:
//key - the name of the property in the object to test
//content - the content that is associated with that key
function getCleanString(key, content) {
  // console.log(
  //   `Checking for null for with key: ${key} and content [${content}]`
  // );
  let emptyContent = false;
  if (content === null || content == "null" || content == "undefined") {
    // console.log(`content for ${key} is empty`);
    emptyContent = true;
  } else {
    // console.log(`Content for key: ${key} is [${content}]`);
  }
  switch (key) {
    case "title":
      if (emptyContent) {
        content = "Untitled";
      }
      break;
    case "plot_overview":
      if (emptyContent) {
        content = "Oh no! This one doesn't have a summary!";
      }
      break;
    case "runtime_minutes":
      if (emptyContent) {
        content = "Unkown";
      } else {
        content = `${content}m`;
      }
      break;
    case "genre_names":
      if (emptyContent) {
        content = "";
      } else {
        content.join(", ");
      }

      break;
    case "user_rating":
      if (emptyContent) {
        // console.log(`We have determined ${content} is null or undefined`);
        content = "No user ratings";
      } else {
        // console.log(`We have determined content is fine`);
        content = `${content}/10`;
      }
      break;
    case "critic_score":
      // console.log(`checking for value of empty content: ${emptyContent}`);
      if (emptyContent) {
        // console.log(`We have determined ${content} is null or undefined`);
        content = "Not reviewed by critics";
      } else {
        // console.log(`We have determined content is fine`);
        content = `${content}/100`;
      }
      break;
    case "poster":
      if (emptyContent) {
        content = "./assets/images/no_image_available.png";
      }
      break;
    case "network_names":
      if (emptyContent) {
        // console.log(`We have determined ${key} is null or undefined`);
        content = "unavailable for streaming :(";
      }
      break;
    case "trailer":
      if (emptyContent) {
        content = "";
      }
      break;
    default:
      break;
  }

  return content;
}

//creates a single card element from a watchmode object and returns it
//Parameter:
//watchmode - the object to turn into a card
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
  const posterUrl = getCleanString("poster", watchmode.poster);
  const cardPoster = document.createElement("img");
  cardPoster.setAttribute("src", posterUrl);
  cardPoster.setAttribute("alt", watchmode.type);
  cardPoster.setAttribute("class", "poster w-24");
  cardFigure.appendChild(cardPoster);

  //create the card body that will go to the right of the image on the card and hold the rest of the content
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  //create the card title and set it to the title from the watchmode object. append to card body
  const cardTitle = document.createElement("h2");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = getCleanString("title", watchmode.title);
  cardBody.appendChild(cardTitle);

  //create cardReleaseDate element, set to release date from watchmode object, append to card body
  let cardReleaseDate = document.createElement("p");
  cardReleaseDate.innerHTML = getCleanString(
    "release_date",
    watchmode.release_date
  );
  cardBody.appendChild(cardReleaseDate);

  //create list to hold other key information like runtime, genres, etc
  let cardList = document.createElement("ul");
  cardList.setAttribute("style", "list-style-type: none");

  //create list items to go in the list
  const genres = getCleanString("genre_names", watchmode.genre_names);
  const genresLi = convertToListItem(genres);
  genresLi.style.fontStyle = "italic";
  cardList.appendChild(genresLi);

  //create running time list element, set to run time from watchmode object, append to list
  const runningTime = getCleanString(
    "runtime_minutes",
    watchmode.runtime_minutes
  );
  const runningTimeLi = convertToListItem(`Running Time: ${runningTime}`);
  cardList.appendChild(runningTimeLi);

  //create user rating list item, set to user rating from watchmode object, append to list
  const userRating = getCleanString("user_rating", watchmode.user_rating);
  const userRatingLi = convertToListItem(`User Rating: ${userRating}`);
  cardList.appendChild(userRatingLi);

  //create critic score list item, set to critic score from watchmode object, append to list
  const criticScore = getCleanString(
    "critic_score",
    `${watchmode.critic_score}`
  );
  const criticRatingLi = convertToListItem(`Critic Rating: ${criticScore}`);
  cardList.appendChild(criticRatingLi);

  //create network names list item, set to network names from watchmode object, append to list
  const networkNames = getCleanString("network_names", watchmode.network_names);
  const streamingLi = convertToListItem(`Where to watch: ${networkNames}`);
  cardList.appendChild(streamingLi);
  cardBody.appendChild(cardList);

  //check for empty trailer item on watchmode object. If not empty, create anchor tag for trailer element, set to trailer url from watchmode object, append to cardBody. Else do not include any trailer informaiton
  const cardTrailerUrl = getCleanString("trailer", watchmode.trailer);
  if (cardTrailerUrl != "") {
    const cardTrailerAnchor = document.createElement("a");
    cardTrailerAnchor.setAttribute("href", cardTrailerUrl);
    cardTrailerAnchor.setAttribute(
      "class",
      "text-primary hover:underline font-semibold"
    );
    cardTrailerAnchor.innerHTML = "Watch Trailer";
    cardBody.appendChild(cardTrailerAnchor);
  }

  //create cardDescription button with hover, set tooltip to overview from watchmode object
  const plotOverview = getCleanString("plot_overview", watchmode.plot_overview);
  const cardDescriptionDiv = document.createElement("div");
  cardDescriptionDiv.setAttribute("class", "tooltip tooltip-bottom");
  cardDescriptionDiv.setAttribute("data-tip", plotOverview);
  const descriptionHoverButton = document.createElement("button");
  descriptionHoverButton.setAttribute("class", "btn btn-primary");
  descriptionHoverButton.innerHTML = "Read Summary";
  cardDescriptionDiv.appendChild(descriptionHoverButton);
  cardBody.appendChild(cardDescriptionDiv);

  //Append the complete card body to the div
  cardDiv.appendChild(cardBody);
  return cardDiv;
}

//sets content of tab label
//Parameters:
//id - element id for tab
//label - content to put on tab
function setTabLabel(id, label) {
  const tab = document.getElementById(id);
  tab.setAttribute("aria-label", label);
}

function displayCards(watchmode) {
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

  if (movieGridEl) movieGridEl.innerHTML = "";
  if (tvSeriesGridEl) tvSeriesGridEl.innerHTML = "";
  if (tvSpecialsGridEl) tvSpecialsGridEl.innerHTML = "";
  if (tvMoviesGridEl) tvMoviesGridEl.innerHTML = "";
  if (tvMiniseriesGridEl) tvMiniseriesGridEl.innerHTML = "";
  if (shortFilmsGridEl) shortFilmsGridEl.innerHTML = "";

  //loop through objects in watchmode results array and create cards then display them for each object
  for (i = 0; i < watchmode.length; i++) {
    const card = createCard(watchmode[i]);
    // console.log(`${watchmode[i].title} is ${watchmode[i].type}`);

    //add the card to the correct tab depending on type
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
}
