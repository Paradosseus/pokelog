import Pokedex from "pokedex-promise-v2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import pokelogLogo from "../assets/pokelog-logo.svg";

export const Main = () => {
    const [pokeData, setpokeData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const getData = async () => {
        try {
            const response = await Axios.get(process.env.REACT_APP_POKEMON_API_URL);
            const fetchedData = await response.data.results;

            const promise = fetchedData.map(async (data) => {
                const response = await Axios.get(data.url);
                return response.data;
            });

            const data = await Promise.all(promise);

            setpokeData(data);
        } catch (error) {
            // Handle the error here, e.g., set an error state or log the error.
            console.error("Error fetching Pokemon data:", error);
        }
    };

    getData();



    const clickedPokemon = (id) => {
        pokeData.map((pokemon) => {
            if (pokemon.id === id) {
                setSelectedPokemon(pokemon)

            }
        })
    }
    return (
        <div className="">
            <div className="bg-[#FF6F40] grid grid-rows-5 lg:grid-cols-7 xl:max-w-6xl h-[800px] border-4 border-black  rounded-2xl overflow-hidden m-auto my-4 p-4">
                <div className="row-span-3 lg:col-span-5 lg:row-span-5 p-5 lg:order-2 relative">
                    {/* Pokeball logo */}
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0">
                        <div className="rounded-full border-black lg:w-[400px] md:w-[350px] md:h-[350px] lg:h-[400px] h-[300px] w-[300px] bg-[#2E2E2E] relative z-0"><div className="bg-[#FF6F40] w-full lg:h-[20px] md:h-[16px] h-[12px] absolute m-0 top-[50%] translate-y-[-50%] z-0"><div className="absolute lg:h-[200px] lg:w-[200px] md:h-[150px] md:w-[150px] h-[120px] w-[120px] bg-[#FF6F40] rounded-full bg-gray m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0"><div className="absolute lg:h-[120px] lg:w-[120px] md:h-[90px] md:w-[90px] h-[70px] w-[70px] bg-[#2E2E2E] rounded-full m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-10"></div></div></div></div>
                    </div>
                    <div className="py-4 lg:hidden"><input type="text" className="bg-transparent border-b-[1px] w-full focus:outline-none text-white" placeholder="Search pokemon..." /></div>
                    <div className="m-auto absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-full z-1">
                        {selectedPokemon ? (
                            <div className="h-full relative">
                                <div className="absolute left-[50%] translate-x-[-50%] lg:top-[72%] md:top-[65%] rounded-2xl lg:w-[600px] md:w-[400px] lg:px-6 lg:py-4 md:px-4 md:py-2 border-4 border-black bg-white text-black">
                                    <div className="capitalize text-center lg:text-[30px] md:text-[20px] font-black">{selectedPokemon.name}</div>
                                    <div className="text-center mb-2">
                                        <ul>
                                            {selectedPokemon.types.map((typeData, index) => (
                                                <li className="inline-block mx-1 text-center rounded-3xl py-1 text-[10px] md:text-[12px] font-bold text-zinc-50 uppercase w-[50px] md:w-[60px]" style={{
                                                    backgroundColor: typeData.type.name === "bug" ? "#A9B91F" : typeData.type.name === "dark" ? "#3E2D23" :
                                                        typeData.type.name === "dragon" ? "#6F5BD6" :
                                                            typeData.type.name === "electric" ? "#FCB915" :
                                                                typeData.type.name === "fairy" ? "#F2B1F2" :
                                                                    typeData.type.name === "fighting" ? "#81321D" :
                                                                        typeData.type.name === "fire" ? "#EF4110" :
                                                                            typeData.type.name === "flying" ? "#93A5F1" :
                                                                                typeData.type.name === "ghost" ? "#6160B2" :
                                                                                    typeData.type.name === "grass" ? "#73C134" :
                                                                                        typeData.type.name === "ground" ? "#D5B45D" :
                                                                                            typeData.type.name === "ice" ? "#96E2FA" :
                                                                                                typeData.type.name === "normal" ? "#C6C1B7" :
                                                                                                    typeData.type.name === "poison" ? "#924491" :
                                                                                                        typeData.type.name === "psychic" ? "#E2497F" :
                                                                                                            typeData.type.name === "rock" ? "#BBA359" :
                                                                                                                typeData.type.name === "steel" ? "#A0A0AE" :
                                                                                                                    typeData.type.name === "water" ? "#3495F6" : "none"
                                                }} key={typeData.type.name}>{typeData.type.name}</li>)
                                            )}
                                        </ul>
                                    </div>
                                    <div className="capitalize">
                                        <div className="md:text-[20px]">
                                            <span className="font-bold ">Abilities:</span> {selectedPokemon.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < selectedPokemon.abilities.length - 1 ? ', ' : ''}</span>))}
                                        </div>
                                        <div className="md:text-[20px]"><span className="font-bold">Height:</span> {selectedPokemon.height / 10 + "m"
                                        }</div>
                                        <div className="md:text-[20px]"><span className="font-bold">Weight:</span> {selectedPokemon.weight / 10 + "kg"}</div>
                                    </div>
                                </div>
                                <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                                    <img src={require(`../assets/animated-sprites/${selectedPokemon.id}.gif`)} alt="" className="h-[100px] md:h-[120px] lg:h-[200px] mx-auto" />
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-[18px] md:text-[25px] font-bold text-white">Select a Pokemon</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row-span-2 lg:col-span-2 lg:row-span-5 bg-[#FF6F40] border-4 border-black rounded-xl lg:order-1 overflow-hidden">
                    <div className="py-4 hidden lg:block">
                        <img src={pokelogLogo} alt="" className="lg:w-[175px] m-auto" />
                    </div>
                    <div className="hidden lg:block"><input type="text" className="bg-[#2E2E2E] w-full p-2 border-black focus:outline-none text-white placeholder-slate-300" placeholder="Search pokemon..." /></div>
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 p-2 overflow-auto scrollbar-hide bg-[#FF6F40] h-[350px] lg:h-screen">
                        {pokeData.map((pokemon) => {
                            return (
                                <div className="bg-black h-[140px] md:h-[160px] lg:h-[85px] rounded-lg relative" key={pokemon.id} onClick={() => clickedPokemon(pokemon.id)}>
                                    <div className="bg-[#ff5503] text-sm round rounded-tl-lg absolute content top-0 left-0 lg:bottom-0 text-white px-2 md:text-[16px] md:px-[10px] md:py-[2px] lg:flex lg:w-[60px]"><div className="lg:m-auto">{`#${pokemon.id}`}</div></div>
                                    <div className="relative mt-6 lg:mx-auto lg:w-[200px] lg:ml-[65px] lg:mt-[12px]">
                                        <img src={pokemon.sprites.front_default} alt="" className="w-[75px] md:w-[90px] m-auto lg:inline-block lg:w-[60px]" />
                                        <p className="capitalize text-center font-bold relative md:text-xl lg:inline-block text-white">{pokemon.name}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
}

