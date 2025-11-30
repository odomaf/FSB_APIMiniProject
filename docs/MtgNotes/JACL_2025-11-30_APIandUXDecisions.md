Saturday 11/30/2025



**===DECISIONS===**

* Moving from MyAnimeList to Jikan, which pulls from MyAnimeList but does not trigger CORS errors
  



**====NOTES===**

Lynette \& James discovered a new Problem:

* MyAnimeList requires client id in header, and getting a CORS error because it was exposed - requires backend work, and that's out of the scope of this project. Options:
  - Do the backend work anyway (decided no, don't want to overscope)
  - Move away from anime to something like OMDB or TMDB to further generalize and get access that allows us to use naked URL without headers that trigger CORS security issues (could work, may require re-thinking our requirements a bit)
  - Find another anime API - will Jikan work for this? (tested in meetings, seems yes, it will, this is our preferred option right now



User Experience Thoughts:

* Dropdown for choosing which top 10 things (like what Clifton has)
* Card arrangement with pics closer to front/top - left side: https://daisyui.com/components/card/#card-with-image-on-side
* Hover 3D card behavior as well: https://daisyui.com/components/hover-3d/#3d-hover-effect-for-image-gallery
* Collapsible card to expand to show streaming options
* James/Anne - will map out and identify tasks and areas of responsibilities
* Include dark/light theme selector



Presentation:

* Front-end: James \& Anne
* Back-end: Clifton \& Lynette



