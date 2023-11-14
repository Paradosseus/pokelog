import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useEffect, useState } from "react";

export const PreviewPokemon = (pokemon) => {

    const [currentPokeData, setCurrentPokeData] = useState(null);



    const { data: pokeData, isLoading, isError, error, refetch } = useQuery({
        queryFn: () => Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.selectedPokemon.name}`).then((res) => res.data),
        queryKey: ["pokeData"],
    });

    useEffect(() => {
        refetch()
    }, [pokemon.selectedPokemon.name]);


    if (isLoading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen w-screen">Loading</div>
            </>
        )
    }
    if (isError) {
        return (
            <div>There was an error occurred:p
                <p>{error.message}</p>
            </div>
        );
    }



    return (
        <>
            {pokeData && (
                <div className="h-full relative">
                    <div className="absolute left-[50%] translate-x-[-50%] lg:top-[60%] md:top-[64%] top-[62%] rounded-2xl w-[300px] lg:w-[450px] md:w-[360px] lg:px-6 lg:py-4 md:px-3 md:py-1 px-2 py-1 border-4 border-black bg-white text-black">
                        <div className="capitalize text-center lg:text-[30px] md:text-[25px] font-black">{pokeData?.name}</div>
                        <div className="text-center mb-2">
                            <ul>
                                {pokeData?.types.map((typeData, index) => (
                                    <li className="inline-block mx-[2px] text-center rounded-3xl py-1 lg:text-[12px] md:text-[10px] text-[8px] font-bold text-zinc-50 uppercase lg:w-[55px] md:w-[45px] w-[40px]" style={{
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
                            <div className="lg:text-[20px] md:text-[15px]">
                                <span className="font-bold ">Abilities:</span> {pokeData?.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < pokeData?.abilities.length - 1 ? ', ' : ''}</span>))}
                            </div>
                            <div className="lg:text-[20px] md:text-[15px]"><span className="font-bold">Height:</span> {pokeData?.height / 10 + "m"
                            }</div>
                            <div className="lg:text-[20px] md:text-[15px]"><span className="font-bold">Weight:</span> {pokeData?.weight / 10 + "kg"}</div>
                        </div>
                    </div>
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                        <img src={require(`../assets/animated-sprites/${pokeData?.id}.gif`)} alt="" className="h-[100px] md:h-[120px] lg:h-[150px] mx-auto" />
                    </div>
                </div>
            )}
        </>
    );
}

