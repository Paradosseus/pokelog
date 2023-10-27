import Axios from "axios";
import { useState } from "react";
import pokelogLogo from "../assets/pokelog-logo.svg";
import { useQuery } from "@tanstack/react-query";
import { PreviewPokemon } from "./PreviewPokemon";
import { PokeNavBar } from "./PokeNavBar";
export const Main = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const { data: pokemons, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const fetchInitialPokeData = await Axios.get('https://pokeapi.co/api/v2/pokemon?limit=150').then((res) => res.data.results)

            const fetchRemainingData = fetchInitialPokeData.map((pokeData) => {
                return Axios.get(pokeData.url).then((res) => res.data)
            });

            const allPokeData = await Promise.all(fetchRemainingData)

            return allPokeData;
        },
        queryKey: ["pokemons"]
    });

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (isError) {
        return <h1>There was an error encountered: {error}  </h1>
    }

    const clickedPokemon = (id) => {
        pokemons.map((pokemon) => {
            if (pokemon.id === id) {
                return setSelectedPokemon(pokemon);
            }

        })
    }


    return (
        <div>
            <div className="bg-[#FF6F40] grid grid-rows-5 lg:grid-cols-7 xl:max-w-6xl h-[800px] border-4 border-black  rounded-2xl overflow-hidden mx-auto mt-3 p-4">
                <div className="row-span-3 lg:col-span-5 lg:row-span-5 pt-2 md:p-2 lg:order-2 relative"><div className="visible lg:hidden"><img src={pokelogLogo} alt="" className="m-auto md:m-0 w-[120px] md:w-[160px]" /></div>
                    {/* Pokeball logo */}
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0">
                        <div className="rounded-full border-black lg:w-[400px] lg:h-[400px] md:w-[325px] md:h-[325px]  h-[300px] w-[300px] bg-[#2E2E2E] relative z-0"><div className="bg-[#FF6F40] w-full lg:h-[20px] md:h-[16px] h-[12px] absolute m-0 top-[50%] translate-y-[-50%] z-0"><div className="absolute lg:h-[150px] lg:w-[150px] md:h-[120px] md:w-[120px] h-[105px] w-[105px] bg-[#FF6F40] rounded-full bg-gray m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-0"><div className="absolute lg:h-[100px] lg:w-[100px] md:h-[80px] md:w-[85px] h-[70px] w-[70px] bg-[#2E2E2E] rounded-full m-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-10"></div></div></div></div>
                    </div>
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

