Sunday Notes 2025-11-23

Plan: in progress
Theme: Entertainment - Anime
Two APIS: MyAnimeList, Watchmode
User Story:
AS someone curious about anime
I WANT to see the top ranking favorite anime properties on MyAnimeList
SO THAT I can see what's available to watch and where I can watch it

Acceptance Criteria:
1. User sees selection box to select type of top 10 objects in MyAnimeList anime collections (may not be all, API has known bugs)
- Top Anime Series
- Top Airing Anime
- Top Upcoming Anime
- Top Anime TV Series
- Top Anime OVA Series
- Top Anime Movies
- Top Anime Specials
- Top Anime by Popularity
- Top Favorited Anime
2. User can click on one to see more details
3. User sees list of shows/movies/short films, grouped by media type
- if nothing returned for a type, indicate "none of this type
- OR if user has specified type (movies only), only show movies, headers aren't needed
4. User sees each item in the list with the following information:
- Title
- Plot Overview
- Release Year
- Genre Names (tags - action adventure)
- User Rating
- Critic Score
- Poster thumbnail
- Where to Watch
- Trailer link?
5. Users can click links to trailer? Additional info? <-- Bonus feature for polish (show on page, not link to something else, embedded video? Clifton notes jquery has support for this in widgets)
6. Users can click on link to a "citations page" (to demonstrate we know how to do navigation
- Cites API sources (My Anime List, Watchmode), describes what they do/are
- Team member bios (optional)

CSS Framework: TailwindCSS (future-proofing, this is going to be better for using with REACT when we learn that later)

TASK BREAKDOWN:
- API Research - all of us, done
- HTML Skeleton/Layout for what's gonna be on there (our objects, etc) - Clifton
+ For tomorrow
- CSS framework setup - Tailwind, researching how to get it to do what we want - James
+ Research how to link Tailwind to our application
+ List of css components we're most likely to need and what they are called
- JS API integration - making things get pulled from API - Lynette & Anne?
+ MyAnimeList - display basic info in console - Lynette
+ Watchmode - display basic info in console - Anne
- UI Layout and styling - Clifton
+ Research accessibility key features, possible examples:
---tab navigation
---screen readers
---colorblind accessible colors






