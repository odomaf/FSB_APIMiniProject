//----WATCHMODE API IMPLEMENTATION----
const watchModeAPIKey = "FtuHOv5sr92FjZGx2SHVTAbsPw8etFsPcJ8gYsin";
//we are going to search the name field for matches for the searchValue
const searchField = "name";
//this will not stay hardcoded, will be assigned based on user request
let searchValue = "one piece";
//change any spaces in the search value into %20 for valid search query
searchValue = searchValue.replace(" ", "%20");
console.log(`searchValue: ${searchValue}`);
//build the URL
let wmRequestURL = `https://api.watchmode.com/v1/search?search_field=${searchField}&search_value=${searchValue}&apiKey=${watchModeAPIKey}`;
console.log("URL Request:", wmRequestURL);

// let fetchDetailsApiRequests = [];
// //fetch instances of searchValue from watchmode
// fetch(wmRequestURL)
//   .then(function (response) {
//     console.log("Raw Response Object:", response);
//     console.log(`HTTP Status: ${response.status}`);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log("Parsed JSON Data: ", data.title_results);
//     console.log(`data.title_results.length: ${data.title_results.length}`);
//     for (i = 0; i < data.title_results.length; i++) {
//       // console.log(`TItle: ${data.title_results[i].id}`);
//       const url = `https://api.watchmode.com/v1/title/${data.title_results[i].id}/details/?apiKey=FtuHOv5sr92FjZGx2SHVTAbsPw8etFsPcJ8gYsin`;
//       fetchDetailsApiRequests.push(url);
//       console.log(`URL: ${fetchDetailsApiRequests[i]}`);
//       console.log(`array length: ${fetchDetailsApiRequests.length}`);
//     }
//   })
//   .catch(function (error) {
//     console.error(`Network or fetch error: ${error}`);
//   });

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
// `<div id="card${media.id}" class="card card-side bg-base-100 shadow-sm w-80"></div>`;

const cardFigure = document.createElement("figure");
cardDiv.appendChild(cardFigure);

const cardPoster = document.createElement("img");
cardPoster.setAttribute("src", media.poster);
cardPoster.setAttribute("alt", media.type);
cardPoster.setAttribute("class", "poster");
cardFigure.appendChild(cardPoster);

const movieTabEl = document.getElementById("movies-tab");

movieTabEl.appendChild(cardDiv);

// <div class="card card-side bg-base-100 shadow-sm w-80">
//   <figure>
//     <img
//       src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
//       alt="Movie"
//     />
//   </figure>
//   <div class="card-body">
//     <h2 class="card-title">New movie is released!</h2>
//     <p>Click the button to watch on Jetflix app.</p>
//     <div class="card-actions justify-end">
//       <!--collapsing box-->
//       <div
//         tabindex="0"
//         class="bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content collapse"
//       >
//         <div class="collapse-title font-semibold">
//           Where can I watch?
//         </div>
//         <div class="collapse-content text-sm">
//           (list or icons of streaming services)
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// const movieDetails = [];
// console.log(
//   `fetchDetailsApiRequests.length: ${fetchDetailsApiRequests.length}`
// );
// console.log(`first fetch url: ${fetchDetailsApiRequests[0]}`);
// fetch(fetchDetailsApiRequests[0])
//   .then(function (response) {
//     console.log("Raw Response Object:", response);
//     console.log(`HTTP Status: ${response.status}`);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log("Parsed JSON Data: ", data);
//   })
//   .catch(function (error) {
//     console.error(`Network or fetch error: ${error}`);
//   });

//----EVENT LISTENERS AND INTERFACE BEHAVIOR FROM CLIFTON ORIGINAL PLAN-----
// We use 'load' instead of 'DOMContentLoaded' to ensure CSS and Images
// are fully loaded so we can calculate the correct heights.
window.addEventListener("load", () => {
  const items = [
    "https://i.redd.it/ujs29gwv78s71.jpg",
    "https://brand-buyers-osaka.com/cms_bb/wp-content/uploads/2020/10/S__19677190-1024x768.jpg",
    "https://i.redd.it/qgp0r1w8cpgf1.jpeg",
    "https://4.bp.blogspot.com/-lpQzJlvzrDo/UfviO8raodI/AAAAAAAAAyw/Hwp-5vENWoU/s1600/Luffy_from_One_Piece_by_Mossarelli.jpg",
    "https://gizmodo.com/app/uploads/2024/08/one-piece-Charithra-Chandran-vivi-netflix-1024x683.jpg",
    "https://www.telegraph.co.uk/content/dam/films/2016/11/14/2640809_Film_-_My_Neighbour_Totoro_DVD_RELEASE.jpg",
    "https://images.augustman.com/wp-content/uploads/sites/3/2024/05/31191504/demon-slayer-season-1-1024x768-1.jpeg",
    "https://blog.alltheanime.com/wp-content/uploads/2024/07/BL01_301.png",
    "https://i.redd.it/h0gti4konl2e1.jpeg",
    "https://ricedigital.co.uk/wp-content/uploads/2021/11/Mikasa-Ackerman-1024x768.jpg",
  ];

  const targets = ["J", "A", "C", "L"];
  const doors = document.querySelectorAll(".door");

  function init(firstInit = true, groups = 1, duration = 1) {
    doors.forEach((door, index) => {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = ["❓"];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        pool[pool.length - 1] = targets[index];

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            door.dataset.spinned = "0";
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      // Fallback: If CSS fails to load, assume 110px height / 100px width
      // This prevents the '0px height' bug.
      const doorHeight = door.clientHeight || 110;
      const doorWidth = door.clientWidth || 100;

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = doorWidth + "px";
        box.style.height = doorHeight + "px";

        if (pool[i].includes("http")) {
          box.style.backgroundImage = `url('${pool[i]}')`;
          box.textContent = "";
        } else {
          box.style.backgroundImage = "none";
          box.textContent = pool[i];
        }

        boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        doorHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
    });
  }

  async function spin() {
    init(false, 4, 5);

    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      // Safe parse: Default to 1s if style is missing to prevent NaN errors
      const duration = parseInt(boxes.style.transitionDuration || "1s");
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  async function autoLoop() {
    await spin();
    setTimeout(autoLoop, 6000);
  }

  init();
  autoLoop();
});
