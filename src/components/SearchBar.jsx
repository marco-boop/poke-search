import { React, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

// 1. Retrieve date from pokeapi
// 2. add input bar
// 3. record input
// 4. filter database based on input

// https://pokeapi.co/api/v2/pokemon?limit=151

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [pokemonList, setPokemonList] = useState([]);

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

  return (
    <>
      <h1 className="text-2xl font-bold mb-2 ">Search Pokemon:</h1>
      <div className="flex bg-white border-black border w-80 sm:w-[800px] rounded-md">
        <AiOutlineSearch className="ml-4 text-2xl" />

        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-2 text-lg w-full focus:outline-none"
        />
      </div>
      {searchQuery}
    </>
  );
};

export default SearchBar;
