import Pokedex from "pokedex-promise-v2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";


export const Main = () => {

    const [pokeData, setpokeData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    let arr = [];

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
        <div className="h-screen grid grid-rows-5">
            <div className="bg-[#7D1818] row-span-3 p-5">
                <div className="py-4"><input type="text" className="bg-transparent border-b-[1px] w-full focus:outline-none text-white" placeholder="Search pokemon..." /></div>
                <div className="bg-[#D9D9D9] bg-opacity-75 w-full h-[350px] rounded-2xl p-6 m-auto">
                    {selectedPokemon ? (
                        <div>
                            <div className="my-2">
                                <img src={require(`../assets/animated-sprites/${selectedPokemon.id}.gif`)} alt="" className="h-[100px] mx-auto" />
                            </div>
                            <div className="text-center">
                                <h1 className="font-bold text-2xl capitalize my-1">{selectedPokemon.name}</h1>
                                <div className="my-1">
                                    <ul>
                                        {selectedPokemon.types.map((typeData, index) => (
                                            <li className="inline-block mx-1 border-slate-950 rounded-3xl px-3 py-1 text-xs font-bold text-zinc-50 uppercase" style={{
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
                                <div className="text-left leading-loose">
                                    <div className="capitalize">
                                        <span className="font-bold">Abilites:</span> {selectedPokemon.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < selectedPokemon.abilities.length - 1 ? ', ' : ''}</span>))}
                                    </div>
                                    <div><span className="font-bold">Height:</span> {selectedPokemon.height / 10 + "m"
                                    }</div>
                                    <div><span className="font-bold">Weight:</span> {selectedPokemon.weight / 10 + "kg"}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-xl font-bold">Select a Pokemon</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="row-span-2">
                <div className="grid grid-cols-3 gap-4 p-2 overflow-auto bg-[#B6B6B6] h-[350px]">
                    {pokeData.map((pokemon) => {

                        return (
                            <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative" key={pokemon.id} onClick={() => clickedPokemon(pokemon.id)}>
                                <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">{`#${pokemon.id}`}</span>
                                <div className="relative mt-6">
                                    <img src={pokemon.sprites.front_default} alt="" className="w-[75px] m-auto" />
                                    <p className="capitalize text-center font-bold relative">{pokemon.name}</p>
                                </div>
                            </div>
                        );
                    })}


                </div>
            </div>
        </div >
    );
}

