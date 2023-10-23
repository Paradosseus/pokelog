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
                console.log(selectedPokemon);
            }
        })
    }




    return (
        <div className="h-screen grid grid-rows-5">
            <div className="bg-[#7D1818] row-span-3 flex justify-center items-center">
                <div className="bg-[#D9D9D9] bg-opacity-75 w-[350px] h-[350px] rounded-2xl p-6">
                    {selectedPokemon ? (
                        <div>
                            <div>
                                <img src={require(`../assets/animated-sprites/${selectedPokemon.id}.gif`)} alt="" className="h-[100px] mx-auto" />
                            </div>
                            <div className="text-center">
                                <h1 className="font-bold text-2xl capitalize">{selectedPokemon.name}</h1>
                                <ul>
                                    {selectedPokemon.types.map((typeData, index) => (
                                        <li className="inline-block mx-1 border rounded-3xl px-3 py-1 text-xs font-semibold capitalize" key={index}>{typeData.type.name}</li>)
                                    )}
                                </ul>
                                <div className="text-left text-m">
                                    <span className="font-bold capitalize">Abilites: {selectedPokemon.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < selectedPokemon.abilities.length - 1 ? ', ' : ''}</span>))}</span>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold">Height: {selectedPokemon.height / 10 + "m"
                                    }</div>
                                    <div className="font-bold">Weight: {selectedPokemon.weight / 10 + "kg"}</div>
                                </div>
                                <div className="text-left font-bold">
                                    <h3>Stats:</h3>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Select a Pokemon</p>
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

