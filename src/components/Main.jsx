import Pokedex from "pokedex-promise-v2";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";


export const Main = () => {

    const [pokeData, setpokeData] = useState([]);
    let arr = [];

    useEffect(() => {
        const getData = async () => {
            const response = await Axios.get("https://pokeapi.co/api/v2/pokemon?limit=6")
            const fetchedData = await response.data.results;

            fetchedData.map(async (data) => {
                const response = await Axios.get(data.url)
                const fetchData = await response.data;
                arr.push(fetchData);
                setpokeData(arr);

            });



        }
        return () => getData();

    }, []);
    console.log(pokeData);




    // const pokemons = pokeData.map((pokemon) => {
    //     return <div key={pokemon.id} className="border">
    //         <img src={pokemon.sprites.front_default} alt="" className="w-[75px] mx-auto" />
    //         <p className="capitalize text-center">{bulb}</p>
    //     </div>
    // })



    return (
        <div className="h-screen grid grid-rows-5">
            <div className="bg-[#7D1818] row-span-3 flex justify-center items-center">
                <div className="bg-[#D9D9D9] bg-opacity-75 w-[350px] h-[350px] rounded-2xl">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg" alt="" />
                </div>
            </div>
            <div className="row-span-2">
                <div className="grid grid-cols-3 gap-4 p-2 overflow-auto bg-[#B6B6B6] h-[350px]">
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                    <div className="bg-[#D9D9D9] h-[140px] rounded-lg relative">
                        <span className="text-sm round rounded-tl-lg absolute content top-0 left-0 bg-black text-white px-2">001</span>
                        <div className="relative mt-6">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className="w-[75px] m-auto" />
                            <p className="capitalize text-center font-bold relative">bulbasaur</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

