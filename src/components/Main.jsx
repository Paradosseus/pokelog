import Pokedex from "pokedex-promise-v2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";


export const Main = () => {
    const [pokeData, setpokeData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const response = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
            const fetchedData = await response.data.results;

            const promise = fetchedData.map(async (data) => {
                const response = await Axios.get(data.url);
                return response.data;
            });

            const data = await Promise.all(promise);

            setpokeData(data);

        }
        return () => getData();

    }, []);

    const clickedPokemon = (id) => {
        pokeData.map((pokemon) => {
            if (pokemon.id === id) {
                setSelectedPokemon(pokemon)

            }
        })
    }
    return (
        <div className="grid grid-rows-5 lg:grid-cols-7 mx-auto xl:max-w-7xl border h-screen overflow-hidden">
            <div className="bg-[#7D1818] row-span-3 lg:col-span-5 lg:row-span-5 p-5 lg:order-2">
                <div className="py-4 lg:hidden"><input type="text" className="bg-transparent border-b-[1px] w-full focus:outline-none text-white" placeholder="Search pokemon..." /></div>
                <div className="bg-[#D9D9D9] bg-opacity-75 w-[350px] md:w-[400px] h-[350px] md:h-[400px] flex justify-center items-center rounded-2xl m-auto">
                    {selectedPokemon ? (
                        <div className="border w-[300px] md:w-[350px] h-[300px] md:h-[350px]">
                            <div className="my-2 md:my-4">
                                <img src={require(`../assets/animated-sprites/${selectedPokemon.id}.gif`)} alt="" className="h-[100px] md:h-[120px] mx-auto" />
                            </div>
                            <div className="text-center">
                                <h1 className="font-bold text-2xl md:text-[30px] capitalize my-1 md:my-1">{selectedPokemon.name}</h1>
                                <div className="my-1">
                                    <ul>
                                        {selectedPokemon.types.map((typeData, index) => (
                                            <li className="inline-block mx-1 border-slate-950 rounded-3xl py-1 text-[10px] md:text-[12px] font-bold text-zinc-50 uppercase w-[50px] md:w-[60px]" style={{
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
                                <div className="text-left">
                                    <div className="capitalize md:text-[20px]">
                                        <span className="font-bold ">Abilities:</span> {selectedPokemon.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < selectedPokemon.abilities.length - 1 ? ', ' : ''}</span>))}
                                    </div>
                                    <div className="md:text-[20px]"><span className="font-bold">Height:</span> {selectedPokemon.height / 10 + "m"
                                    }</div>
                                    <div className="md:text-[20px]"><span className="font-bold">Weight:</span> {selectedPokemon.weight / 10 + "kg"}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-[18px] md:text-[25px] font-bold">Select a Pokemon</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="row-span-2 lg:col-span-2 lg:row-span-5 bg-[#B6B6B6] lg:order-1">
                <div className="py-4 hidden lg:block"><input type="text" className="bg-transparent border-b-[1px] w-full border-black focus:outline-none text-black placeholder-slate-600" placeholder="Search pokemon..." /></div>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 p-2 overflow-auto scrollbar-hide bg-[#B6B6B6] h-[350px] lg:h-screen">
                    {pokeData.map((pokemon) => {
                        return (
                            <div className="bg-[#D9D9D9] h-[140px] md:h-[160px] lg:h-[85px] rounded-lg relative" key={pokemon.id} onClick={() => clickedPokemon(pokemon.id)}>
                                <div className="bg-[#000000] text-sm round rounded-tl-lg absolute content top-0 left-0 lg:bottom-0 text-white px-2 md:text-[16px] md:px-[10px] md:py-[2px] lg:flex lg:w-[60px]"><div className="lg:m-auto">{`#${pokemon.id}`}</div></div>
                                <div className="relative mt-6 lg:mx-auto lg:w-[200px] lg:ml-[65px] lg:mt-[12px]">
                                    <img src={pokemon.sprites.front_default} alt="" className="w-[75px] md:w-[90px] m-auto lg:inline-block lg:w-[60px]" />
                                    <p className="capitalize text-center font-bold relative md:text-xl lg:inline-block">{pokemon.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

