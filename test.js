const baseURL = "https://api.jikan.moe/v4";
const endPoint = "/top/anime";
const favorite = document.getElementById("favorite");
const popular = document.getElementById("popular");
const titles = [];
const watchmode = [];

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

      titles.splice(0,titles.length);

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

      titles.splice(0,titles.length);

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

// WatchMode API
//'https://api.watchmode.com/v1/search/?apiKey=YOUR_API_KEY&search_field=name&search_value=Ed%20Wood'

function addListItem(titles) {
  const topFaves = document.getElementById("topFaves");

  if (topFaves.children.length !== 0){
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

https://api.watchmode.com/v1/search/?apiKey=ZrI3YIL51rLJL91Ep8nSU2BUbaJKM7nzep3P1wLb&search_field=name&search_value=Attack on Titan


    titleButton.addEventListener("click", function () {
      const baseURL = "https://api.watchmode.com/v1";
      const endPoint = "/search";
      parameter = `/?apiKey=ZrI3YIL51rLJL91Ep8nSU2BUbaJKM7nzep3P1wLb&search_field=name&search_value=${encodeURIComponent(title.jikanTitle)}`;
      requestURL = baseURL + endPoint + parameter;
      console.log(requestURL);

      fetch(requestURL)
        .then(function (responseFromWatchmode) {
          return responseFromWatchmode.json();
        })
        .then(function (javaScriptObjectFromWatchmode) {
          console.log(javaScriptObjectFromWatchmode);


          // for(let index = 0; index < javaScriptObjectFromWatchmode.titles_results.length; index++){
          //    let watchmodeData = {
          //     id: javaScriptObjectFromWatchmode.titles_results[index]["id"],
          //     title: javaScriptObjectFromWatchmode.titles_results[index]["name"],
          //     plot_overview: ,
          //     type: ,
          //     runtime_minutes: ,
          //     release_date: ,
          //     genre_names: ,
          //     user_rating: ,
          //     critic_score: ,
          //     poster: ,
          //     network_names: ,
          //     trailer:
          //    };
          // }





        });
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
