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
