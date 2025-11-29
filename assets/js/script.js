//----WATCHMODE API VARIABLES----
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

//fetch instances of searchValue from watchmode
fetch(wmRequestURL)
  .then(function (response) {
    console.log("Raw Response Object:", response);
    console.log(`HTTP Status: ${response.status}`);
    return response.json();
  })
  .then(function (data) {
    console.log("Parsed JSON Data outside loop: ", data);
    // for (i = 0; i < data.length; i++) {
    //   console.log("Parsed JSON Data inside loop: ", data[i]);
    // }
  })
  .catch(function (error) {
    console.error(`Network or fetch error: ${error}`);
  });
