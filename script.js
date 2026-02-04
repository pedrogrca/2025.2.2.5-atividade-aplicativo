const typeColors = {
    bug: "#a8b820",
    dragon: "#7038f8",
    electric: "#f8d030",
    fairy: "#ee99ac",
    fighting: "#c03028",
    fire: "#f08030",
    flying: "#a890f0",
    ghost: "#705898",
    grass: "#78c850",
    ground: "#e0c068",
    ice: "#98d8d8",
    normal: "#a8a878",
    poison: "#a040a0",
    psychic: "#f85888",
    rock: "#b8a038",
    steel: "#b8b8d0",
    water: "#6890f0",
};

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const pokemonCard = document.getElementById("pokemon-card");
const errorMessage = document.getElementById("error-message");

const imgElement = document.getElementById("pokemon-img");
const nameElement = document.getElementById("pokemon-name");
const idElement = document.getElementById("pokemon-id");
const typesContainer = document.getElementById("types-container");
const hpElement = document.getElementById("hp-val");
const attackElement = document.getElementById("attack-val");
const defenseElement = document.getElementById("defense-val");
const speedElement = document.getElementById("speed-val");

const url = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = async () => {
    let pokemonName = searchInput.value.toLowerCase().trim();

    if (!pokemonName) return;

    pokemonCard.style.display = "none";
    errorMessage.style.display = "none";

    try {
        const response = await fetch(`${url}${pokemonName}`);

        if (!response.ok) {
            throw new Error("Pokemon não encontrado");
        }

        const data = await response.json();
        renderPokemon(data);

    } catch (error) {
        errorMessage.style.display = "block";
        console.error(error);
    }
};

const renderPokemon = (data) => {
    const sprite = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    imgElement.src = sprite;
    
    nameElement.textContent = data.name;
    idElement.textContent = data.id;

    hpElement.textContent = data.stats[0].base_stat;
    attackElement.textContent = data.stats[1].base_stat;
    defenseElement.textContent = data.stats[2].base_stat;
    speedElement.textContent = data.stats[5].base_stat;

    typesContainer.innerHTML = "";
    const types = data.types;
    
    const mainType = types[0].type.name;
    const themeColor = typeColors[mainType] || "#ffffff";
    styleCardBackground(themeColor);

    types.forEach((item) => {
        let span = document.createElement("span");
        span.textContent = item.type.name;
        span.classList.add("type-badge");
        span.style.backgroundColor = typeColors[item.type.name] || "#777";
        typesContainer.appendChild(span);
    });

    pokemonCard.style.display = "block";
};

const styleCardBackground = (color) => {
    pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
};

searchBtn.addEventListener("click", getPokemon);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getPokemon();
    }
});