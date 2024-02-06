import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

// 1. Retrieve date from pokeapi
// 2. add input bar
// 3. record input
// 4. filter database based on input

// https://pokeapi.co/api/v2/pokemon?limit=151

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const heightClass = `h-${pokemonData.height}`;

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      const firstGenPokemon = response.data.results;
      const pokeNames = firstGenPokemon.map((pokemon) => pokemon.name);

      if (searchQuery) {
        const pokeNamesFiltered = pokeNames.filter((pokemon) =>
          pokemon.toLowerCase().includes(searchQuery)
        );
        setPokemonList(pokeNamesFiltered);
        // console.log(pokeNamesFiltered);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [searchQuery]);

  const handleSelectPokemon = (pokemonName) => {
    setSearchQuery(pokemonName);
    setSelectedPokemon(pokemonName);
  };

  const fetchSelectedPokemonData = async () => {
    if (!selectedPokemon) return;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
      );
      // console.log(response.data);
      setPokemonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelectedPokemonData();
  }, [selectedPokemon]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2 ">Search Pokemon:</h1>
      <div className="relative flex bg-white border-black border w-80 sm:w-[800px] rounded-md py-4">
        <AiOutlineSearch className="ml-4 text-2xl" />

        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-2 text-lg w-full focus:outline-none"
        />
        {pokemonList && searchQuery && (
          <div className="bg-white text-black w-full z-10 absolute top-14 rounded-md max-h-40 overflow-y-auto">
            {pokemonList.map((pokemon, index) => (
              <p
                key={index}
                className="pl-4 hover:bg-yellow-300 cursor-pointer"
                onClick={() => handleSelectPokemon(pokemon)}
              >
                {pokemon}
              </p>
            ))}
          </div>
        )}
      </div>
      {pokemonData && (
        <div className="">
          <h2 className="pt-20 text-xl font-bold mt-4 text-transform: capitalize">
            {pokemonData.name}
          </h2>
          <p className="text-transform: capitalize">
            {pokemonData.name} is {pokemonData.height} units tall.
          </p>
          <img
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.name}
            className={heightClass}
          />

          {/* <h3>Abilities:</h3> */}
          {/* <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>
                {ability.ability.name} {ability.is_hidden && "(Hidden)"}
              </li>
            ))}
          </ul> */}
          {/* Display other relevant data here */}
        </div>
      )}
    </>
  );
};

export default SearchBar;
