/* declares strict mode, cannot use undeclared variables */
"use strict"

/* variable for container */
const container = document.querySelector('.container');
/* html Segments */
let characterHtmlSegment = ''
let homeworldHtmlSegment = ''

/* function that renders previous data shown on screen */
function renderPreviousData(htmlSegment){
	container.innerHTML = htmlSegment;
}

/* Generates a random number to get 1 of the 83 of Star Wars characters in API data. 
Fetches API data using constructed URL or passed URL. */
async function getData(selectedUrl) {
  let randomNum = Math.floor(Math.random() * 83) + 1;
  const url = selectedUrl ? selectedUrl : `https://www.swapi.tech/api/people/${randomNum}`
  try {
    let res = await fetch(url)
    return await res.json();
    console.log(res)
    } catch(error) {
    console.log(error);
    }
 }

/* Gets API data and renders character  */
async function renderCharacter(data) {
  //const characterIndex = await createCharacterIndex()
  const originalData = await getData();
  const character = originalData.result.properties;
  const originalHomeworldData = await getData(character.homeworld);
  const homeworld = originalHomeworldData.result.properties;

  characterHtmlSegment =
    `
      <div class="child">
        <h1>Character Spotlight<h1>
        <h2>${character.name}</h2>
        <h3>Height: <span class="bodyText">${character.height}cm</span></h3>
        <h3>Mass: <span class="bodyText">${character.mass}kg</span><h3>
        <h3>Birth year: <span class="bodyText">${character.birth_year}</span></h3>
        <h3>Hair color: <span class="bodyText">${character.hair_color}</span></h3>
        <h3>Skin color: <span class="bodyText">${character.skin_color}</span></h3>
        <h3>Eye color: <span class="bodyText">${character.eye_color}</span></h3>
        <h3>Gender: <span class="bodyText">${character.gender}</span></h3>
        <h3 onClick="renderHomeworld('${character.homeworld}')">Homeworld:<span class="bodyText link"> ${homeworld.name}</span></h3>
      <button onClick="renderCharacter()">Generate New Character</button>
      </div>
    `;
    if (character.name === "unknown" || character.name === undefined) {
      renderCharacter()
    } else {
    container.innerHTML = characterHtmlSegment;
    }
};
  
/* Renders homeworld data if it is known. */
async function renderHomeworld(homeworldUrl) {
  const originalData = await getData(homeworldUrl)
  const homeworld = originalData.result.properties;

  homeworldHtmlSegment =
    `
    <div class="child">
      <h1>Homeworld<h1>
        <h2>${homeworld.name}</h2>
        <h3>Diameter: <span class="bodyText">${homeworld.diameter}</span></h3>
        <h3>Rotation Period: <span class="bodyText">${homeworld.rotation_period}</span></h3>
        <h3>Climate: <span class="bodyText">${homeworld.climate}</span></h3>
        <h3>Gravity: <span class="bodyText">${homeworld.gravity}</span></h3>
        <h3>Terrain: <span class="bodyText">${homeworld.terrain}</span></h3>
      <button onClick="renderCharacter()">Generate New Character</button>
      <button onClick="renderPreviousData(characterHtmlSegment)">Back</button>
    </div>
    `;
     container.innerHTML = homeworldHtmlSegment;
};

/* calls render characters function on page load*/
renderCharacter();

 