### **Saturday morning, 11/22/2025**



**DECISIONS**

* Plain English problem statement: Where can I consume television/movies for top ranking anime properties?
* We'll be using Tailwind as our CSS framework
* Meeting tomorrow: 10cst/11est
* Team Name: JACL 



**ACTION ITEMS:** 

\- EVERYONE: sign up for MyAnimeList - get API Key (asks for URL where you'll be using it, James created GitHub pages for a fake repo to use for this, we each probably need to do the same)

\- EVERYONE: sign up for Watchmode - get API Key

\- EVERYONE: install Insomnia: https://insomnia.rest/

\- EVERYONE: for tomorrow - sketch an idea for user experience - what will they see/do in interacting with our application 





**====General Notes====**

\- Debooru - NSFW, don't use

\- AniDB - documented poorly, needs more review to see if works, and maybe a login

\- MyAnimeList -- James got this one producing data via insomnia

\- Watchmode API - for getting information on where to watch things

&nbsp;+ Use media title to get media id, then media id to get streaming services

&nbsp;+ Returns multiple json objects, one for each streaming service it's available on



What we figured out:

\- MyAnimeList ranking gets lists of favorite Anime Properties

\- Watchmode can return specific items related to that property





Brainstorming problem statement

\- Get favorite anime properties by ranking from MyAnimeList

\- Allow user to choose property

\- Offer visual media instances of that property
- Choosing instance, return where to watch

\+ Take title from MyAnimeList, use to get where to watch



Plain English problem statement

* Where can I consume television/movies for top ranking anime properties?



api.watchmode.com













