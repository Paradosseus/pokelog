import Axios from "axios";
import { useState } from "react";
import pokelogLogo from "../assets/pokelog-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { PreviewPokemon } from "./PreviewPokemon";
import { PokeNavBar } from "./PokeNavBar";
export const Main = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);


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
                setSelectedPokemon(pokemon);
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
                        {selectedPokemon ? <PreviewPokemon selectedPokemon={selectedPokemon} /> : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-[18px] md:text-[25px] font-bold text-white">Select a Pokemon</p>
                            </div>
                        )}
                    </div>

                </div>
                <PokeNavBar pokemons={pokemons} clickedPokemon={clickedPokemon} />
            </div>
        </div >
    );
}

