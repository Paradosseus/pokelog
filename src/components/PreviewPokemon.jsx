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
        return <h1>Loading...</h1>
    }
    if (isError) {
        return (
            <div>There was an error occurred:p
                <p>{error.message}</p>
            </div>
        );
    }



    return (
        <div className="m-auto absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-full z-1">
            {pokeData ? (
                <div className="h-full relative">
                    <div className="absolute left-[50%] translate-x-[-50%] lg:top-[72%] md:top-[65%] rounded-2xl lg:w-[600px] md:w-[400px] lg:px-6 lg:py-4 md:px-4 md:py-2 border-4 border-black bg-white text-black">
                        <div className="capitalize text-center lg:text-[30px] md:text-[20px] font-black">{pokeData?.name}</div>
                        <div className="text-center mb-2">
                            <ul>
                                {pokeData?.types.map((typeData, index) => (
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
                                <span className="font-bold ">Abilities:</span> {pokeData?.abilities.map((abilityData, index) => (<span key={index}>{abilityData.ability.name}{index < pokeData?.abilities.length - 1 ? ', ' : ''}</span>))}
                            </div>
                            <div className="md:text-[20px]"><span className="font-bold">Height:</span> {pokeData?.height / 10 + "m"
                            }</div>
                            <div className="md:text-[20px]"><span className="font-bold">Weight:</span> {pokeData?.weight / 10 + "kg"}</div>
                        </div>
                    </div>
                    <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                        <img src={require(`../assets/animated-sprites/${pokeData?.id}.gif`)} alt="" className="h-[100px] md:h-[120px] lg:h-[200px] mx-auto" />
                    </div>
                </div>
            ) : (
                <div className="h-full flex items-center justify-center">
                    <p className="text-[18px] md:text-[25px] font-bold text-white">Select a Pokemon</p>
                </div>
            )}
        </div>
    );
}

