import Pokedex from "pokedex-promise-v2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import pokelogLogo from "../assets/pokelog-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { PreviewPokemon } from "./PreviewPokemon";

export const Main = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getData = async () => {
    //     try {
    //         const response = await Axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    //         const fetchedData = await response.data.results;

    //         const promise = fetchedData.map(async (data) => {
    //             const response = await Axios.get(data.url);
    //             return response.data;
    //         });

    //         const data = await Promise.all(promise);

    //         setpokeData(data);

    //     } catch (error) {
    //         // Handle the error here, e.g., set an error state or log the error.
    //         console.error("Error fetching Pokemon data:", error);
    //     }


    // };

    // getData();

    const { data: pokemons, isLoading, isError } = useQuery({
        queryFn: () => Axios.get('https://pokeapi.co/api/v2/pokemon?limit=150').then((res) => res.data.results),
        queryKey: ["pokemons"]
    });

    if (isLoading) {
        return <h1>Loading....</h1>
    }





    const clickedPokemon = (id) => {
        pokemons.map((pokemon, index) => {
            if ((index + 1) === id) {
                setSelectedPokemon(pokemon)
            }

        })
    }
    return (
        // <div>{pokemons?.map((pokemon, index) => {
        //     return <li key={index}>{index + 1}</li>
        // })}</div>
        <div className="">
            <div className="bg-[#FF6F40] grid grid-rows-5 lg:grid-cols-7 xl:max-w-6xl h-[800px] border-4 border-black  rounded-2xl overflow-hidden m-auto my-4 p-4">
                <div className="row-span-3 lg:col-span-5 lg:row-span-5 p-5 lg:order-2 relative">
                    {/* Pokeball logo */}
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0">
                        <div className="rounded-full border-black lg:w-[400px] md:w-[350px] md:h-[350px] lg:h-[400px] h-[300px] w-[300px] bg-[#2E2E2E] relative z-0"><div className="bg-[#FF6F40] w-full lg:h-[20px] md:h-[16px] h-[12px] absolute m-0 top-[50%] translate-y-[-50%] z-0"><div className="absolute lg:h-[200px] lg:w-[200px] md:h-[150px] md:w-[150px] h-[120px] w-[120px] bg-[#FF6F40] rounded-full bg-gray m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0"><div className="absolute lg:h-[120px] lg:w-[120px] md:h-[90px] md:w-[90px] h-[70px] w-[70px] bg-[#2E2E2E] rounded-full m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-10"></div></div></div></div>
                    </div>
                    <div className="py-4 lg:hidden"><input type="text" className="bg-transparent border-b-[1px] w-full focus:outline-none text-white" placeholder="Search pokemon..." /></div>
                    {selectedPokemon && <PreviewPokemon selectedPokemon={selectedPokemon} />}
                </div>
                <div className="row-span-2 lg:col-span-2 lg:row-span-5 bg-[#FF6F40] border-4 border-black rounded-xl lg:order-1 overflow-hidden">
                    <div className="py-4 hidden lg:block">
                        <img src={pokelogLogo} alt="" className="lg:w-[175px] m-auto" />
                    </div>
                    <div className="hidden lg:block"><input type="text" className="bg-[#2E2E2E] w-full p-2 border-black focus:outline-none text-white placeholder-slate-300" placeholder="Search pokemon..." /></div>
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 p-2 overflow-auto scrollbar-hide bg-[#FF6F40] h-[350px] lg:h-screen">
                        {pokemons.map((pokemon, index) => {
                            return (
                                <div className="bg-black h-[140px] md:h-[160px] lg:h-[85px] rounded-lg relative" key={index + 1} onClick={() => clickedPokemon(index + 1)}>
                                    <div className="bg-[#ff5503] text-sm round rounded-tl-lg absolute content top-0 left-0 lg:bottom-0 text-white px-2 md:text-[16px] md:px-[10px] md:py-[2px] lg:flex lg:w-[60px]"><div className="lg:m-auto">{`#${index + 1}`}</div></div>
                                    <div className="relative mt-6 lg:mx-auto lg:w-[200px] lg:ml-[65px] lg:mt-[12px]">
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt="" className="w-[75px] md:w-[90px] m-auto lg:inline-block lg:w-[60px]" />
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

